import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EvidenceGateway } from '../application/evidence.gateway';
import { Evidence } from '../domain/model/evidence';

interface EvidenceResponse {
  id: number;
  incidentId: number | null;
  measurementId: number | null;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedByUserId: number;
  uploadedAt: string;
}

@Injectable({ providedIn: 'root' })
export class EvidenceHttpAdapter extends EvidenceGateway {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1/evidences';

  listEvidence(): Observable<Evidence[]> {
    return this.http
      .get<EvidenceResponse[]>(this.apiUrl)
      .pipe(map((evidences) => evidences.map((evidence) => this.toEvidence(evidence))));
  }

  uploadEvidence(file: File, uploadedByUserId: string): Observable<Evidence> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadedByUserId', uploadedByUserId);

    return this.http
      .post<EvidenceResponse>(this.apiUrl, formData)
      .pipe(map((evidence) => this.toEvidence(evidence)));
  }

  private toEvidence(response: EvidenceResponse): Evidence {
    return {
      id: String(response.id),
      incidentId: response.incidentId ? String(response.incidentId) : undefined,
      measurementId: response.measurementId ? String(response.measurementId) : undefined,
      fileName: response.fileName,
      fileUrl: response.fileUrl,
      fileType: response.fileType,
      uploadedByUserId: String(response.uploadedByUserId),
      uploadedAt: response.uploadedAt,
    };
  }
}
