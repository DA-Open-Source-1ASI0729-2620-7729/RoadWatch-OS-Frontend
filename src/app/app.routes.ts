import { Routes } from '@angular/router';

const documentEvidenceRoutes = () =>
  import('./document-evidence/document-evidence.routes').then(m => m.documentEvidenceRoutes);
const reportsComplianceRoutes = () =>
  import('./reports-compliance/reports-compliance.routes').then(m => m.reportsComplianceRoutes);
const identityAccessRoutes = () =>
  import('./identity-access/identity-access.routes').then(m => m.identityAccessRoutes);
const subscriptionRoutes = () =>
  import('./subscription/subscription.routes').then(m => m.subscriptionRoutes);

export const routes: Routes = [
  { path: 'auth', loadChildren: identityAccessRoutes },
  { path: 'subscription', loadChildren: subscriptionRoutes },
  { path: 'documents', loadChildren: documentEvidenceRoutes },
  { path: 'reports', loadChildren: reportsComplianceRoutes },
  { path: '', pathMatch: 'full', redirectTo: 'documents' },
  { path: '**', redirectTo: 'documents' },
];
