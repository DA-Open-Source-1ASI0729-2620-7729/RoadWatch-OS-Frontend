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
  protected readonly selectedMilestone = signal('Auditoría mensual - Septiembre');
  protected readonly notification = signal('');
  protected readonly selectedFile = signal('');
  protected readonly pendingCount = computed(
    () => this.documents().filter((document) => document.status === 'Falta').length,
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
  protected readonly milestones = [
    { name: 'Línea base ambiental', progress: '5/5 documentos', complete: true },
    { name: 'Auditoría mensual - Septiembre', progress: '4/5 documentos', complete: false },
    { name: 'Auditoría mensual - Octubre', progress: '0/5 documentos', complete: false },
    { name: 'Cierre de obra', progress: '0/8 documentos', complete: false },
  ];
  protected readonly documents = computed(() =>
    this.store.normativeDocuments().map(toNormativeDocumentViewModel),
  );
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
      this.selectedFile.set(file.name);
      this.notification.set(`Archivo “${file.name}” listo para registrar.`);
    }
  }
  protected registerSelectedFile(): void {
    const name = this.selectedFile();
    if (!name || !this.canWrite()) return;
    this.selectedFile.set('');
    this.notification.set(`${name} fue registrado correctamente.`);
  }
  protected uploadMissing(document: NormativeDocumentViewModel): void {
    if (!this.canWrite()) return;
    const source = this.store.normativeDocuments().find((item) => item.id === document.id);
    if (source)
      this.store.updateNormativeDocument({ ...source, status: 'UPLOADED', currentVersion: 1 });
    this.notification.set(`${document.name} fue cargado correctamente.`);
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
