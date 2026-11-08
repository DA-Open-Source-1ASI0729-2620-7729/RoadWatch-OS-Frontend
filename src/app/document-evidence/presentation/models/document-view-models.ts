import { Evidence } from '../../domain/model/evidence';
import { NormativeDocument } from '../../domain/model/normative-document';
import { RequiredDocument } from '../../domain/model/required-document';

export interface EvidenceViewModel {
  id: string;
  name: string;
  relation: string;
  type: 'Fotografía' | 'Documento';
  author: string;
  date: string;
  status: 'Cargada' | 'En revisión';
}

export interface NormativeDocumentViewModel {
  id: string;
  name: string;
  type: string;
  version: string;
  uploadedBy: string;
  required: boolean;
  status: 'Cargado' | 'Falta';
}

export interface RequiredDocumentViewModel {
  id: string;
  name: string;
  milestone: string;
  type: string;
  status: 'Cargado' | 'Pendiente';
  dueDate: string;
}

export const toEvidenceViewModel = (evidence: Evidence): EvidenceViewModel => ({
  id: evidence.id,
  name: evidence.fileName,
  relation: evidence.incidentId ? `Incidencia ${evidence.incidentId}` : 'Sin asociación',
  type: evidence.fileType.startsWith('image/') ? 'Fotografía' : 'Documento',
  author: evidence.uploadedByUserId,
  date: evidence.uploadedAt,
  status: 'Cargada',
});

export const toNormativeDocumentViewModel = (
  document: NormativeDocument,
): NormativeDocumentViewModel => ({
  id: document.id,
  name: document.name,
  type: 'Documento',
  version: document.currentVersion ? `v${document.currentVersion}` : '—',
  uploadedBy: document.status === 'UPLOADED' ? `RoadWatch · ${document.createdAt}` : '—',
  required: true,
  status: document.status === 'MISSING' ? 'Falta' : 'Cargado',
});

export const toRequiredDocumentViewModel = (
  document: RequiredDocument,
): RequiredDocumentViewModel => ({
  id: document.id,
  name: document.documentName,
  milestone: document.milestoneName,
  type: 'Documento',
  status: document.mandatory ? 'Pendiente' : 'Cargado',
  dueDate: document.mandatory ? '30/09/2026' : 'Completado',
});
