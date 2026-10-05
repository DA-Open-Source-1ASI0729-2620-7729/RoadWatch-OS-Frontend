import { Routes } from '@angular/router';

const auditReport = () => import('./presentation/views/audit-report/audit-report').then(m => m.AuditReport);
const complianceSummary = () => import('./presentation/views/compliance-summary/compliance-summary').then(m => m.ComplianceSummary);

export const reportsComplianceRoutes: Routes = [
  { path: 'audit', loadComponent: auditReport, title: 'Reporte de auditoría | RoadWatch OS' },
  { path: 'compliance', loadComponent: complianceSummary, title: 'Cumplimiento | RoadWatch OS' },
  { path: '', pathMatch: 'full', redirectTo: 'audit' },
];
