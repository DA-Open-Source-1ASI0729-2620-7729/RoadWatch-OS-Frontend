import { Routes } from '@angular/router';

const documentEvidenceRoutes = () =>
  import('./document-evidence/document-evidence.routes').then(m => m.documentEvidenceRoutes);
const reportsComplianceRoutes = () =>
  import('./reports-compliance/reports-compliance.routes').then(m => m.reportsComplianceRoutes);
const identityAccessRoutes = () =>
  import('./identity-access/identity-access.routes').then(m => m.identityAccessRoutes);

export const routes: Routes = [
  { path: 'auth', loadChildren: identityAccessRoutes },
  { path: 'documents', loadChildren: documentEvidenceRoutes },
  { path: 'reports', loadChildren: reportsComplianceRoutes },
  { path: '', pathMatch: 'full', redirectTo: 'documents' },
  { path: '**', redirectTo: 'documents' },
];
