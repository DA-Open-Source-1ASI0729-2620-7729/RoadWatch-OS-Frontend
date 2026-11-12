import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';
import { EvidenceItem, EvidencePanel } from '../../components/evidence-panel/evidence-panel';
import { AuthStore } from '../../../../identity-access/application/auth.store';
import { DocumentEvidenceStore } from '../../../application/document-evidence.store';
import {
  NormativeDocumentViewModel,
  toEvidenceViewModel,
  toNormativeDocumentViewModel,
} from '../../models/document-view-models';

interface MilestoneDocumentViewModel extends NormativeDocumentViewModel {
  projectId: string;
  sourceDocumentId?: string;
}

@Component({
  selector: 'app-normative-documents',
  imports: [EvidencePanel, RouterLink, RouterLinkActive, AppShell],
  styleUrl: './normative-documents.css',
  templateUrl: './normative-documents.html',
})
export class NormativeDocuments {
  protected readonly navigation = inject(AppNavigation).items;
  private readonly store = inject(DocumentEvidenceStore);
  private readonly auth = inject(AuthStore);
  protected readonly selectedMilestone = signal('');
  protected readonly notification = signal('');
  protected readonly selectedFile = signal<File | null>(null);
  protected readonly projectId = signal('');
  protected readonly pendingCount = computed(
    () =>
      this.documents().filter((document) => document.required && document.status === 'Falta')
        .length,
  );
  protected readonly selectedDocument = signal<NormativeDocumentViewModel | null>(null);
  protected readonly evidence = computed<EvidenceItem[]>(() =>
    this.store.evidence().map((item) => {
      const viewModel = toEvidenceViewModel(item);
      return {
        id: viewModel.id,
        name: viewModel.name,
        type: viewModel.type === 'Fotografía' ? 'image' : 'document',
        author: viewModel.author,
        createdAt: viewModel.date,
        status: viewModel.status,
      };
    }),
  );
  protected readonly milestones = computed(() => {
    const uploadedDocuments = new Set(
      this.store
        .normativeDocuments()
        .filter((document) => document.status === 'UPLOADED')
        .map((document) => `${document.projectId}:${document.name}`.toLowerCase()),
    );
    const milestones = new Map<string, { total: number; uploaded: number }>();

    for (const requirement of this.store.requiredDocuments()) {
      const current = milestones.get(requirement.milestoneName) ?? { total: 0, uploaded: 0 };
      current.total += 1;
      if (uploadedDocuments.has(`${requirement.projectId}:${requirement.documentName}`.toLowerCase())) {
        current.uploaded += 1;
      }
      milestones.set(requirement.milestoneName, current);
    }

    return [...milestones.entries()].map(([name, progress]) => ({
      name,
      progress: `${progress.uploaded}/${progress.total} documentos`,
      complete: progress.uploaded === progress.total,
    }));
  });
  protected readonly currentMilestone = computed(() => {
    const selected = this.selectedMilestone();
    return this.milestones().some((milestone) => milestone.name === selected)
      ? selected
      : (this.milestones()[0]?.name ?? 'Sin hitos registrados');
  });
  protected readonly documents = computed<MilestoneDocumentViewModel[]>(() => {
    const milestone = this.currentMilestone();
    const documents = this.store.normativeDocuments();

    return this.store
      .requiredDocuments()
      .filter((requirement) => requirement.milestoneName === milestone)
      .map((requirement) => {
        const source = documents.find(
          (document) =>
            document.projectId === requirement.projectId &&
            document.name.toLocaleLowerCase() === requirement.documentName.toLocaleLowerCase(),
        );

        if (source) {
          return {
            ...toNormativeDocumentViewModel(source),
            required: requirement.mandatory,
            projectId: requirement.projectId,
            sourceDocumentId: source.id,
          };
        }

        return {
          id: `required-${requirement.id}`,
          name: requirement.documentName,
          type: 'Documento',
          version: '—',
          uploadedBy: '—',
          required: requirement.mandatory,
          status: 'Falta',
          projectId: requirement.projectId,
        };
      });
  });
  protected readonly canWrite = computed(() => {
    const roleType = this.auth.user()?.role?.type;
    return roleType === 'ADMIN' || roleType === 'MANAGER' || roleType === 'ENVIRONMENTAL_OFFICER';
  });
  protected chooseMilestone(name: string): void {
    this.selectedMilestone.set(name);
  }
  protected onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile.set(file);
      this.notification.set(`Archivo “${file.name}” listo para registrar.`);
    }
  }
  protected registerSelectedFile(): void {
    const file = this.selectedFile();
    const uploadedByUserId = this.auth.user()?.id;
    if (!file || !this.projectId() || !uploadedByUserId || !this.canWrite()) return;

    this.store.createNormativeDocument(this.projectId(), file, uploadedByUserId).subscribe({
      next: () => {
        this.selectedFile.set(null);
        this.projectId.set('');
        this.notification.set(`${file.name} fue registrado correctamente.`);
      },
      error: () => this.notification.set('No se pudo registrar el documento.'),
    });
  }
  protected uploadMissing(document: MilestoneDocumentViewModel, event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    const uploadedByUserId = this.auth.user()?.id;
    if (!file || !uploadedByUserId || !this.canWrite()) return;
    if (document.sourceDocumentId) {
      this.store
        .uploadNormativeDocumentVersion(document.sourceDocumentId, file, uploadedByUserId)
        .subscribe({
        next: () => this.notification.set(`${document.name} fue cargado correctamente.`),
        error: () => this.notification.set('No se pudo cargar la versión del documento.'),
      });
      return;
    }

    this.store.createNormativeDocument(document.projectId, file, uploadedByUserId).subscribe({
      next: () => this.notification.set(`${document.name} fue cargado correctamente.`),
      error: () => this.notification.set('No se pudo registrar el documento.'),
    });
  }
  protected download(document: NormativeDocumentViewModel): void {
    this.notification.set(`Preparando la descarga de ${document.name}.`);
  }
  protected openDocument(document: NormativeDocumentViewModel): void {
    this.selectedDocument.set(document);
  }
  protected closeDocument(): void {
    this.selectedDocument.set(null);
  }
  protected addEvidence(file: File): void {
    if (!this.canWrite()) return;
    this.store.uploadEvidence(file, this.auth.user()?.id ?? '');
    this.notification.set(`Evidencia “${file.name}” agregada para revisión.`);
  }
  protected downloadEvidence(item: EvidenceItem): void {
    this.notification.set(`Preparando la descarga de ${item.name}.`);
  }
  protected closeMilestone(): void {
    this.notification.set(
      this.pendingCount()
        ? 'Completa los documentos requeridos antes de cerrar este hito.'
        : 'El hito está listo para cerrarse.',
    );
  }
}
