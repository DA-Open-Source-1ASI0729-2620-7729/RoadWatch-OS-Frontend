import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RequiredDocumentGateway } from '../application/required-document.gateway';
import { RequiredDocument } from '../domain/model/required-document';

interface RequiredDocumentResponse {
  id: number;
  projectId: number;
  milestoneName: string;
  documentName: string;
  mandatory: boolean;
  dueDate: string | null;
}

@Injectable({ providedIn: 'root' })
export class RequiredDocumentHttpAdapter extends RequiredDocumentGateway {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1/required-documents';

  listRequiredDocuments(): Observable<RequiredDocument[]> {
    return this.http
      .get<RequiredDocumentResponse[]>(this.apiUrl)
      .pipe(map((documents) => documents.map((document) => this.toDocument(document))));
  }

  createRequiredDocument(
    projectId: string,
    milestoneName: string,
    documentName: string,
    mandatory: boolean,
    dueDate: string | null,
  ): Observable<RequiredDocument> {
    return this.http
      .post<RequiredDocumentResponse>(this.apiUrl, {
        projectId: Number(projectId),
        milestoneName,
        documentName,
        mandatory,
        dueDate,
      })
      .pipe(map((document) => this.toDocument(document)));
  }

  private toDocument(response: RequiredDocumentResponse): RequiredDocument {
    return {
      id: String(response.id),
      projectId: String(response.projectId),
      milestoneName: response.milestoneName,
      documentName: response.documentName,
      mandatory: response.mandatory,
      dueDate: response.dueDate,
    };
  }
}
