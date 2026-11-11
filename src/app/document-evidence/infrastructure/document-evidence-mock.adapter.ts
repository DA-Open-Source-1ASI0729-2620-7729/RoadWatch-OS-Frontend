import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentEvidenceGateway } from '../application/document-evidence.gateway';
import { NormativeDocument } from '../domain/model/normative-document';
import { RequiredDocument } from '../domain/model/required-document';

@Injectable({ providedIn: 'root' })
export class DocumentEvidenceMockAdapter extends DocumentEvidenceGateway {
  private normativeDocuments: NormativeDocument[] = [
    {
      id: 'DOC-01',
      projectId: 'PRY-003',
      name: 'EIA-sd Carretera Central Tramo 2.pdf',
      status: 'UPLOADED',
      currentVersion: 3,
      createdAt: '2026-09-12',
    },
    {
      id: 'DOC-02',
      projectId: 'PRY-003',
      name: 'Certificado calibración N-08.pdf',
      status: 'MISSING',
      currentVersion: 0,
      createdAt: '2026-09-12',
    },
  ];
  private readonly requiredDocuments: RequiredDocument[] = [
    {
      id: 'REQ-01',
      projectId: 'PRY-003',
      milestoneName: 'Auditoría mensual - Septiembre',
      documentName: 'Certificado calibración N-08.pdf',
      mandatory: true,
    },
  ];
  listNormativeDocuments(): Observable<NormativeDocument[]> {
    return of(this.normativeDocuments);
  }
  listRequiredDocuments(): Observable<RequiredDocument[]> {
    return of(this.requiredDocuments);
  }
  updateNormativeDocument(document: NormativeDocument): Observable<NormativeDocument> {
    this.normativeDocuments = this.normativeDocuments.map((item) =>
      item.id === document.id ? document : item,
    );
    return of(document);
  }
}
