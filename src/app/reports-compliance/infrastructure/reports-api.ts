import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReportsGateway } from '../application/reports.gateway';
import { AuditReport } from '../domain/model/audit-report';
import { ComplianceSummary } from '../domain/model/compliance-summary';
import { EnvironmentalKpi } from '../domain/model/environmental-kpi';
import { ProjectReport } from '../domain/model/project-report';
import { ReportExportRequest } from '../domain/model/report-export-request';

/** Temporary mock adapter. Replace its methods with the approved HTTP client calls later. */
@Injectable({ providedIn: 'root' })
export class ReportsApi extends ReportsGateway {
  private readonly reports: AuditReport[] = [
    { id: 'r-001', projectId: 'p-01', projectName: 'Carretera Central – Tramo 2', periodStart: '2026-09-01', periodEnd: '2026-09-30', status: 'Emitido', issuedAt: '2026-10-01', sections: ['summary', 'measurements', 'incidents', 'evidence', 'documents'] },
    { id: 'r-002', projectId: 'p-03', projectName: 'Panamericana Sur – Chilca', periodStart: '2026-08-01', periodEnd: '2026-08-31', status: 'Observado', issuedAt: '2026-09-03', sections: ['summary', 'incidents', 'documents'] },
  ];
  listReports(): Observable<AuditReport[]> { return of(this.reports); }
  getReport(id: string): Observable<AuditReport> { return of(this.reports.find(report => report.id === id) ?? this.reports[0]); }
  generateReport(request: ReportExportRequest): Observable<AuditReport> {
    const report: AuditReport = {
      id: crypto.randomUUID(),
      projectId: request.projectId,
      projectName: 'Carretera Central – Tramo 2',
      periodStart: request.periodStart,
      periodEnd: request.periodEnd,
      status: 'Borrador',
      sections: request.sections,
    };

    this.reports.unshift(report);
    return of(report);
  }
  getComplianceSummary(): Observable<ComplianceSummary> { return of({ compliancePercentage: 82, requiredDocuments: 24, pendingDocuments: 4, openIncidents: 6, criticalIncidents: 1, averageResolutionHours: 6.4 }); }
  getEnvironmentalKpis(): Observable<EnvironmentalKpi[]> { return of([{ code: 'compliance', label: 'Cumplimiento ambiental', value: '82%', detail: 'promedio de proyectos supervisados', icon: 'verified_user', tone: 'success' }, { code: 'documents', label: 'Documentos obligatorios', value: '20 / 24', detail: '4 documentos pendientes', icon: 'folder_open', tone: 'warning' }, { code: 'incidents', label: 'Hallazgos abiertos', value: '4', detail: '1 requiere atención inmediata', icon: 'fact_check', tone: 'danger' }, { code: 'reports', label: 'Reportes emitidos', value: '14', detail: 'durante septiembre', icon: 'description', tone: 'neutral' }]); }
  getProjectReports(): Observable<ProjectReport[]> { return of([{ projectId: 'p-01', projectName: 'Carretera Central – Tramo 2', contractor: 'Consorcio Vial Andino', compliancePercentage: 87, requiredDocuments: 8, pendingDocuments: 1, openIncidents: 1, criticalIncidents: 0 }, { projectId: 'p-02', projectName: 'Vía de Evitamiento Norte', contractor: 'Constructora Pacífico SAC', compliancePercentage: 96, requiredDocuments: 8, pendingDocuments: 0, openIncidents: 0, criticalIncidents: 0 }, { projectId: 'p-03', projectName: 'Panamericana Sur – Chilca', contractor: 'Obras del Sur SA', compliancePercentage: 64, requiredDocuments: 8, pendingDocuments: 3, openIncidents: 3, criticalIncidents: 2 }]); }
  exportPdf(reportId: string): Observable<Blob> { return of(new Blob([`Reporte ${reportId}`], { type: 'application/pdf' })); }
}
