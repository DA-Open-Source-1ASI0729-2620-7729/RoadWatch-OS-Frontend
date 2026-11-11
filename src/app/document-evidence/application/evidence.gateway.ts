import { Observable } from 'rxjs';
import { Evidence } from '../domain/model/evidence';

export abstract class EvidenceGateway {
  abstract listEvidence(): Observable<Evidence[]>;
  abstract uploadEvidence(file: File, uploadedByUserId: string): Observable<Evidence>;
}
