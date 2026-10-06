import { Routes } from '@angular/router';

const documentEvidenceRoutes = () => import('./document-evidence/document-evidence.routes').then(m => m.documentEvidenceRoutes);
const reportsComplianceRoutes = () => import('./reports-compliance/reports-compliance.routes').then(m => m.reportsComplianceRoutes);
const identityAccessRoutes = () => import('./identity-access/identity-access.routes').then(m => m.identityAccessRoutes);
const subscriptionRoutes = () => import('./subscription/subscription.routes').then(m => m.subscriptionRoutes);
const incidentMitigationRoutes = () => import('./incident-mitigation/incident-mitigation.routes').then(m => m.INCIDENT_MITIGATION_ROUTES);
const environmentalMonitoringRoutes = () => import('./environmental-monitoring/environmental-monitoring.routes').then(m => m.environmentalMonitoringRoutes);

export const routes: Routes = [
  { path: 'auth', loadChildren: identityAccessRoutes },
  { path: 'subscription', loadChildren: subscriptionRoutes },
  { path: 'monitoring', loadChildren: environmentalMonitoringRoutes },
  { path: 'documents', loadChildren: documentEvidenceRoutes },
  { path: 'reports', loadChildren: reportsComplianceRoutes },
  { path: 'incidents', loadChildren: incidentMitigationRoutes },
  { path: '', pathMatch: 'full', redirectTo: 'documents' },
  { path: '**', redirectTo: 'documents' },
];
