import { Routes } from '@angular/router';

const documentEvidenceRoutes = () =>
  import('./document-evidence/document-evidence.routes').then((m) => m.documentEvidenceRoutes);
const reportsComplianceRoutes = () =>
  import('./reports-compliance/reports-compliance.routes').then((m) => m.reportsComplianceRoutes);
const identityAccessRoutes = () =>
  import('./identity-access/identity-access.routes').then((m) => m.identityAccessRoutes);
const subscriptionRoutes = () =>
  import('./subscription/subscription.routes').then((m) => m.subscriptionRoutes);
const incidentMitigationRoutes = () =>
  import('./incident-mitigation/incident-mitigation.routes').then(
    (m) => m.INCIDENT_MITIGATION_ROUTES,
  );
const environmentalMonitoringRoutes = () =>
  import('./environmental-monitoring/environmental-monitoring.routes').then(
    (m) => m.environmentalMonitoringRoutes,
  );
const projectList = () =>
  import('./project-management/presentation/views/portafolio-lista/portafolio-lista').then(
    (m) => m.PortafolioLista,
  );
const projectCards = () =>
  import('./project-management/presentation/views/portafolio-tarjetas/portafolio-tarjetas').then(
    (m) => m.PortafolioTarjetas,
  );
const monitoringPoints = () =>
  import('./project-management/presentation/views/puntos-monitoreo/puntos-monitoreo').then(
    (m) => m.PuntosMonitoreo,
  );
const projectDetail = () =>
  import('./project-management/presentation/views/project-detail/project-detail').then(
    (m) => m.ProjectDetail,
  );

export const routes: Routes = [
  { path: 'auth', loadChildren: identityAccessRoutes },
  { path: 'subscription', loadChildren: subscriptionRoutes },
  { path: 'monitoring', loadChildren: environmentalMonitoringRoutes },
  { path: 'documents', loadChildren: documentEvidenceRoutes },
  { path: 'reports', loadChildren: reportsComplianceRoutes },
  { path: 'incidents', loadChildren: incidentMitigationRoutes },
  { path: 'projects', loadComponent: projectList },
  { path: 'projects/cards', loadComponent: projectCards },
  { path: 'projects/:id/monitoring-points', loadComponent: monitoringPoints },
  { path: 'projects/:id', loadComponent: projectDetail },
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'documents' },
];
