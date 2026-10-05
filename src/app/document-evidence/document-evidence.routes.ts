import { Routes } from '@angular/router';

const normativeDocuments = () =>
  import('./presentation/views/normative-documents/normative-documents').then(m => m.NormativeDocuments);

export const documentEvidenceRoutes: Routes = [
  { path: '', loadComponent: normativeDocuments, title: 'Documentos normativos | RoadWatch OS' },
];
