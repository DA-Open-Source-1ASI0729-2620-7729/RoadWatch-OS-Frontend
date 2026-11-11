import { Component, computed, inject, signal } from '@angular/core';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';
import { AuthStore } from '../../../../identity-access/application/auth.store';
import { DocumentEvidenceStore } from '../../../application/document-evidence.store';
import { toRequiredDocumentViewModel } from '../../models/document-view-models';

@Component({
  selector: 'app-required-documents',
  imports: [AppShell],
  styleUrl: './required-documents.css',
  templateUrl: './required-documents.html',
})
export class RequiredDocuments {
  protected readonly navigation = inject(AppNavigation).items;
  private readonly store = inject(DocumentEvidenceStore);
  private readonly auth = inject(AuthStore);
  protected readonly filter = signal<'Todos' | 'Obligatorio'>('Todos');
  protected readonly projectId = signal('');
  protected readonly milestoneName = signal('');
  protected readonly documentName = signal('');
  protected readonly dueDate = signal('');
  protected readonly mandatory = signal(true);
  protected readonly notification = signal('');
  protected readonly documents = computed(() =>
    this.store.requiredDocuments().map(toRequiredDocumentViewModel),
  );
  protected readonly canWrite = computed(() => {
    const roleType = this.auth.user()?.role?.type;
    return roleType === 'ADMIN' || roleType === 'MANAGER' || roleType === 'ENVIRONMENTAL_OFFICER';
  });
  protected readonly visibleDocuments = computed(() =>
    this.filter() === 'Todos'
      ? this.documents()
      : this.documents().filter((document) => document.status === 'Obligatorio'),
  );
  protected setFilter(filter: 'Todos' | 'Obligatorio'): void {
    this.filter.set(filter);
  }
  protected createRequirement(): void {
    if (!this.canWrite() || !this.projectId() || !this.milestoneName() || !this.documentName()) return;

    this.store
      .createRequiredDocument(
        this.projectId(),
        this.milestoneName(),
        this.documentName(),
        this.mandatory(),
        this.dueDate() || null,
      )
      .subscribe({
        next: () => {
          this.projectId.set('');
          this.milestoneName.set('');
          this.documentName.set('');
          this.dueDate.set('');
          this.mandatory.set(true);
          this.notification.set('Documento requerido registrado correctamente.');
        },
        error: () => this.notification.set('No se pudo registrar el documento requerido.'),
      });
  }
}
