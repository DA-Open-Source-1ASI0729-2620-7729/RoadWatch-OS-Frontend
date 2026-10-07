import { Observable } from 'rxjs';
import { AuditReport } from '../domain/model/audit-report';
import { ComplianceSummary } from '../domain/model/compliance-summary';
import { EnvironmentalKpi } from '../domain/model/environmental-kpi';
import { ProjectReport } from '../domain/model/project-report';
import { ReportExportRequest } from '../domain/model/report-export-request';

export abstract class ReportsGateway {
  abstract listReports(): Observable<AuditReport[]>;
  abstract getReport(id: string): Observable<AuditReport>;
  abstract generateReport(request: ReportExportRequest): Observable<AuditReport>;
  abstract getComplianceSummary(): Observable<ComplianceSummary>;
  abstract getEnvironmentalKpis(): Observable<EnvironmentalKpi[]>;
  abstract getProjectReports(): Observable<ProjectReport[]>;
  abstract exportPdf(reportId: string): Observable<Blob>;
}
