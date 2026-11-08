import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentEvidenceGateway } from '../application/document-evidence.gateway';
import { Evidence } from '../domain/model/evidence';
import { NormativeDocument } from '../domain/model/normative-document';
import { RequiredDocument } from '../domain/model/required-document';

@Injectable({ providedIn: 'root' })
export class DocumentEvidenceMockAdapter extends DocumentEvidenceGateway {
  private evidence: Evidence[] = [
    {
      id: 'EV-104',
      incidentId: 'INC-0142',
      fileName: 'Foto frente de obra N-04.jpg',
      fileUrl: '',
      fileType: 'image/jpeg',
      uploadedByUserId: 'Jorge Ramos',
      uploadedAt: '2026-09-12',
    },
    {
      id: 'EV-105',
      fileName: 'Acta de verificación.pdf',
      fileUrl: '',
      fileType: 'application/pdf',
      uploadedByUserId: 'EcoAudit',
      uploadedAt: '2026-09-12',
    },
  ];
  private readonly normativeDocuments: NormativeDocument[] = [
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
  listEvidence(): Observable<Evidence[]> {
    return of(this.evidence);
  }
  listNormativeDocuments(): Observable<NormativeDocument[]> {
    return of(this.normativeDocuments);
  }
  listRequiredDocuments(): Observable<RequiredDocument[]> {
    return of(this.requiredDocuments);
  }
  uploadEvidence(evidence: Evidence): Observable<Evidence> {
    this.evidence = [evidence, ...this.evidence];
    return of(evidence);
  }
}
