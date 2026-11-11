import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentEvidenceGateway } from '../application/document-evidence.gateway';
import { RequiredDocument } from '../domain/model/required-document';

@Injectable({ providedIn: 'root' })
export class DocumentEvidenceMockAdapter extends DocumentEvidenceGateway {
  private readonly requiredDocuments: RequiredDocument[] = [
    {
      id: 'REQ-01',
      projectId: 'PRY-003',
      milestoneName: 'Auditoría mensual - Septiembre',
      documentName: 'Certificado calibración N-08.pdf',
      mandatory: true,
    },
  ];
  listRequiredDocuments(): Observable<RequiredDocument[]> {
    return of(this.requiredDocuments);
  }
}
