import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NormativeDocumentGateway } from '../application/normative-document.gateway';
import { NormativeDocument } from '../domain/model/normative-document';
import { DocumentStatus } from '../domain/model/document-status';

interface NormativeDocumentResponse {
  id: number;
  projectId: number;
  name: string;
  status: DocumentStatus;
  currentVersion: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NormativeDocumentHttpAdapter extends NormativeDocumentGateway {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1/normative-documents';

  listNormativeDocuments(): Observable<NormativeDocument[]> {
    return this.http
      .get<NormativeDocumentResponse[]>(this.apiUrl)
      .pipe(map((documents) => documents.map((document) => this.toDocument(document))));
  }

  createNormativeDocument(projectId: string, name: string): Observable<NormativeDocument> {
    return this.http
      .post<NormativeDocumentResponse>(this.apiUrl, { projectId: Number(projectId), name })
      .pipe(map((document) => this.toDocument(document)));
  }

  uploadDocumentVersion(
    documentId: string,
    file: File,
    uploadedByUserId: string,
  ): Observable<NormativeDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadedByUserId', uploadedByUserId);

    return this.http
      .post<NormativeDocumentResponse>(`${this.apiUrl}/${documentId}/file`, formData)
      .pipe(map((document) => this.toDocument(document)));
  }

  private toDocument(response: NormativeDocumentResponse): NormativeDocument {
    return {
      id: String(response.id),
      projectId: String(response.projectId),
      name: response.name,
      status: response.status,
      currentVersion: response.currentVersion,
      createdAt: response.createdAt,
    };
  }
}
