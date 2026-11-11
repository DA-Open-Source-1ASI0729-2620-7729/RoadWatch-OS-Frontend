import { inject, Injectable, signal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Evidence } from '../domain/model/evidence';
import { NormativeDocument } from '../domain/model/normative-document';
import { RequiredDocument } from '../domain/model/required-document';
import { EvidenceGateway } from './evidence.gateway';
import { NormativeDocumentGateway } from './normative-document.gateway';
import { RequiredDocumentGateway } from './required-document.gateway';

@Injectable({ providedIn: 'root' })
export class DocumentEvidenceStore {
  private readonly evidenceGateway = inject(EvidenceGateway);
  private readonly normativeDocumentGateway = inject(NormativeDocumentGateway);
  private readonly requiredDocumentGateway = inject(RequiredDocumentGateway);
  readonly evidence = signal<Evidence[]>([]);
  readonly normativeDocuments = signal<NormativeDocument[]>([]);
  readonly requiredDocuments = signal<RequiredDocument[]>([]);

  constructor() {
    this.evidenceGateway.listEvidence().subscribe((items) => this.evidence.set(items));
    this.normativeDocumentGateway
      .listNormativeDocuments()
      .subscribe((items) => this.normativeDocuments.set(items));
    this.requiredDocumentGateway
      .listRequiredDocuments()
      .subscribe((items) => this.requiredDocuments.set(items));
  }

  uploadEvidence(file: File, uploadedByUserId: string): void {
    this.evidenceGateway
      .uploadEvidence(file, uploadedByUserId)
      .subscribe((item) => this.evidence.update((items) => [item, ...items]));
  }

  createNormativeDocument(
    projectId: string,
    file: File,
    uploadedByUserId: string,
  ): Observable<NormativeDocument> {
    return this.normativeDocumentGateway
      .createNormativeDocument(projectId, file.name)
      .pipe(
        switchMap((document) =>
          this.normativeDocumentGateway.uploadDocumentVersion(document.id, file, uploadedByUserId),
        ),
        tap((document) => this.normativeDocuments.update((items) => [document, ...items])),
      );
  }

  uploadNormativeDocumentVersion(
    documentId: string,
    file: File,
    uploadedByUserId: string,
  ): Observable<NormativeDocument> {
    return this.normativeDocumentGateway
      .uploadDocumentVersion(documentId, file, uploadedByUserId)
      .pipe(
        tap((document) =>
          this.normativeDocuments.update((items) =>
            items.map((current) => (current.id === document.id ? document : current)),
          ),
        ),
      );
  }

  createRequiredDocument(
    projectId: string,
    milestoneName: string,
    documentName: string,
    mandatory: boolean,
    dueDate: string | null,
  ): Observable<RequiredDocument> {
    return this.requiredDocumentGateway
      .createRequiredDocument(projectId, milestoneName, documentName, mandatory, dueDate)
      .pipe(tap((document) => this.requiredDocuments.update((items) => [document, ...items])));
  }
}
