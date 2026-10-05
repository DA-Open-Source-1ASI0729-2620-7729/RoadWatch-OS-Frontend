import { Routes } from '@angular/router';

const auditReport = () => import('./presentation/views/audit-report/audit-report').then(m => m.AuditReport);

export const reportsComplianceRoutes: Routes = [
  { path: 'audit', loadComponent: auditReport, title: 'Reporte de auditoría | RoadWatch OS' },
  { path: '', pathMatch: 'full', redirectTo: 'audit' },
];
