import { Observable } from 'rxjs';
import { RequiredDocument } from '../domain/model/required-document';

export abstract class DocumentEvidenceGateway {
  abstract listRequiredDocuments(): Observable<RequiredDocument[]>;
}
