import { Routes } from '@angular/router';

const normativeDocuments = () =>
  import('./presentation/views/normative-documents/normative-documents').then(m => m.NormativeDocuments);
const evidenceLibrary = () =>
  import('./presentation/views/evidence-library/evidence-library').then(m => m.EvidenceLibrary);
const requiredDocuments = () =>
  import('./presentation/views/required-documents/required-documents').then(m => m.RequiredDocuments);

export const documentEvidenceRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'normative' },
  { path: 'normative', loadComponent: normativeDocuments, title: 'Documentos normativos | RoadWatch OS' },
  { path: 'evidence', loadComponent: evidenceLibrary, title: 'Evidencias | RoadWatch OS' },
  { path: 'required', loadComponent: requiredDocuments, title: 'Documentos requeridos | RoadWatch OS' },
];
