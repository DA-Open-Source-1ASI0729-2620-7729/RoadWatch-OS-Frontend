import { Observable } from 'rxjs';
import { Evidence } from '../domain/model/evidence';
import { NormativeDocument } from '../domain/model/normative-document';
import { RequiredDocument } from '../domain/model/required-document';

export abstract class DocumentEvidenceGateway {
  abstract listEvidence(): Observable<Evidence[]>;
  abstract listNormativeDocuments(): Observable<NormativeDocument[]>;
  abstract listRequiredDocuments(): Observable<RequiredDocument[]>;
  abstract uploadEvidence(evidence: Evidence): Observable<Evidence>;
}
