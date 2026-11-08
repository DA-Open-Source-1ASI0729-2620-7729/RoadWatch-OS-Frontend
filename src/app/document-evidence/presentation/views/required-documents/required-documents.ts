import { Component, computed, inject, signal } from '@angular/core';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';
import { AuthStore } from '../../../../identity-access/application/auth.store';
import { DocumentEvidenceStore } from '../../../application/document-evidence.store';
import {
  RequiredDocumentViewModel,
  toRequiredDocumentViewModel,
} from '../../models/document-view-models';

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
  protected readonly filter = signal<'Todos' | 'Pendiente'>('Todos');
  protected readonly documents = computed(() =>
    this.store.requiredDocuments().map(toRequiredDocumentViewModel),
  );
  protected readonly canWrite = computed(() =>
    this.auth.user()?.role.permissions.some((permission) => permission.code === 'documents.write'),
  );
  protected readonly visibleDocuments = computed(() =>
    this.filter() === 'Todos'
      ? this.documents()
      : this.documents().filter((document) => document.status === 'Pendiente'),
  );
  protected setFilter(filter: 'Todos' | 'Pendiente'): void {
    this.filter.set(filter);
  }
  protected upload(document: RequiredDocumentViewModel): void {
    if (!this.canWrite()) return;
  }
}
