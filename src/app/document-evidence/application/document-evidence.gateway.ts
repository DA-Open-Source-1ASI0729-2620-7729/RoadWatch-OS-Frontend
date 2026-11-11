import { Observable } from 'rxjs';
import { NormativeDocument } from '../domain/model/normative-document';
import { RequiredDocument } from '../domain/model/required-document';

export abstract class DocumentEvidenceGateway {
  abstract listNormativeDocuments(): Observable<NormativeDocument[]>;
  abstract listRequiredDocuments(): Observable<RequiredDocument[]>;
  abstract updateNormativeDocument(document: NormativeDocument): Observable<NormativeDocument>;
}
