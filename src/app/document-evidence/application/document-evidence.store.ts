import { inject, Injectable, signal } from '@angular/core';
import { Evidence } from '../domain/model/evidence';
import { NormativeDocument } from '../domain/model/normative-document';
import { RequiredDocument } from '../domain/model/required-document';
import { DocumentEvidenceGateway } from './document-evidence.gateway';
import { EvidenceGateway } from './evidence.gateway';

@Injectable({ providedIn: 'root' })
export class DocumentEvidenceStore {
  private readonly gateway = inject(DocumentEvidenceGateway);
  private readonly evidenceGateway = inject(EvidenceGateway);
  readonly evidence = signal<Evidence[]>([]);
  readonly normativeDocuments = signal<NormativeDocument[]>([]);
  readonly requiredDocuments = signal<RequiredDocument[]>([]);

  constructor() {
    this.evidenceGateway.listEvidence().subscribe((items) => this.evidence.set(items));
    this.gateway.listNormativeDocuments().subscribe((items) => this.normativeDocuments.set(items));
    this.gateway.listRequiredDocuments().subscribe((items) => this.requiredDocuments.set(items));
  }

  uploadEvidence(file: File, uploadedByUserId: string): void {
    this.evidenceGateway
      .uploadEvidence(file, uploadedByUserId)
      .subscribe((item) => this.evidence.update((items) => [item, ...items]));
  }

  updateNormativeDocument(document: NormativeDocument): void {
    this.gateway
      .updateNormativeDocument(document)
      .subscribe((item) =>
        this.normativeDocuments.update((items) =>
          items.map((current) => (current.id === item.id ? item : current)),
        ),
      );
  }
}
