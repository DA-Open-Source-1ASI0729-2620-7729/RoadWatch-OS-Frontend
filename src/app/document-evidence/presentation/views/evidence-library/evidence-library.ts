import { Component, computed, inject, signal } from '@angular/core';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';
import { AuthStore } from '../../../../identity-access/application/auth.store';
import { DocumentEvidenceStore } from '../../../application/document-evidence.store';
import { EvidenceViewModel, toEvidenceViewModel } from '../../models/document-view-models';

@Component({
  selector: 'app-evidence-library',
  imports: [AppShell],
  styleUrl: './evidence-library.css',
  templateUrl: './evidence-library.html',
})
export class EvidenceLibrary {
  protected readonly navigation = inject(AppNavigation).items;
  private readonly store = inject(DocumentEvidenceStore);
  private readonly auth = inject(AuthStore);
  protected readonly notification = signal('');
  protected readonly evidence = computed(() => this.store.evidence().map(toEvidenceViewModel));
  protected readonly canWrite = computed(() =>
    this.auth.user()?.role.permissions.some((permission) => permission.code === 'documents.write'),
  );

  protected upload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !this.canWrite()) return;
    this.store.uploadEvidence({
      id: crypto.randomUUID(),
      fileName: file.name,
      fileUrl: '',
      fileType: file.type,
      uploadedByUserId: this.auth.user()?.id ?? 'unknown',
      uploadedAt: new Date().toISOString(),
    });
    this.notification.set(`Evidencia “${file.name}” registrada para revisión.`);
  }

  protected download(item: EvidenceViewModel): void {
    this.notification.set(`Preparando la descarga de ${item.name}.`);
  }
}
