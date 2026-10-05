import { Routes } from '@angular/router';

const documentEvidenceRoutes = () =>
  import('./document-evidence/document-evidence.routes').then(m => m.documentEvidenceRoutes);

export const routes: Routes = [
  { path: 'documents', loadChildren: documentEvidenceRoutes },
  { path: '', pathMatch: 'full', redirectTo: 'documents' },
  { path: '**', redirectTo: 'documents' },
];
