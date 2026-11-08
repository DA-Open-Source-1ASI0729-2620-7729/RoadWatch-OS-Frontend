import { Routes } from '@angular/router';
import { requireAuthenticatedUser } from './identity-access/application/auth.guard';

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
  {
    path: 'subscription',
    loadChildren: subscriptionRoutes,
    canActivate: [requireAuthenticatedUser],
  },
  {
    path: 'monitoring',
    loadChildren: environmentalMonitoringRoutes,
    canActivate: [requireAuthenticatedUser],
  },
  {
    path: 'documents',
    loadChildren: documentEvidenceRoutes,
    canActivate: [requireAuthenticatedUser],
  },
  {
    path: 'reports',
    loadChildren: reportsComplianceRoutes,
    canActivate: [requireAuthenticatedUser],
  },
  {
    path: 'incidents',
    loadChildren: incidentMitigationRoutes,
    canActivate: [requireAuthenticatedUser],
  },
  { path: 'projects', loadComponent: projectList, canActivate: [requireAuthenticatedUser] },
  { path: 'projects/cards', loadComponent: projectCards, canActivate: [requireAuthenticatedUser] },
  {
    path: 'projects/:id/monitoring-points',
    loadComponent: monitoringPoints,
    canActivate: [requireAuthenticatedUser],
  },
  { path: 'projects/:id', loadComponent: projectDetail, canActivate: [requireAuthenticatedUser] },
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'auth/login' },
];
