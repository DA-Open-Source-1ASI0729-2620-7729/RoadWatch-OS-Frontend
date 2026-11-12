import { Observable } from 'rxjs';
import { NormativeDocument } from '../domain/model/normative-document';

export abstract class NormativeDocumentGateway {
  abstract listNormativeDocuments(): Observable<NormativeDocument[]>;
  abstract createNormativeDocument(projectId: string, name: string): Observable<NormativeDocument>;
  abstract uploadDocumentVersion(
    documentId: string,
    file: File,
    uploadedByUserId: string,
  ): Observable<NormativeDocument>;
  abstract downloadDocumentFile(documentId: string): Observable<Blob>;
}
