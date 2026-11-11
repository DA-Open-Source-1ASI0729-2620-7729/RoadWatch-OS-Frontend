import { Observable } from 'rxjs';
import { RequiredDocument } from '../domain/model/required-document';

export abstract class RequiredDocumentGateway {
  abstract listRequiredDocuments(): Observable<RequiredDocument[]>;
  abstract createRequiredDocument(
    projectId: string,
    milestoneName: string,
    documentName: string,
    mandatory: boolean,
    dueDate: string | null,
  ): Observable<RequiredDocument>;
}
