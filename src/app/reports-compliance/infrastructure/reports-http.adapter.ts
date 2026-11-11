import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ReportsGateway } from '../application/reports.gateway';
import { AuditReport } from '../domain/model/audit-report';
import { ComplianceSummary } from '../domain/model/compliance-summary';
import { EnvironmentalKpi } from '../domain/model/environmental-kpi';
import { ProjectReport } from '../domain/model/project-report';
import { ReportExportRequest } from '../domain/model/report-export-request';
import { ReportStatus } from '../domain/model/report-status';

interface AuditReportResponse {
  id: number;
  projectId: number;
  projectName: string | null;
  periodStart: string;
  periodEnd: string;
  status: ReportStatus;
  generatedAt: string | null;
  sections: string[];
  fileUrl: string | null;
}

interface ComplianceSummaryResponse {
  id: number;
  projectId: number;
  compliantMeasurements: number;
  nonCompliantMeasurements: number;
  compliancePercentage: number;
  calculatedAt: string;
}

interface EnvironmentalKpiResponse {
  id: number;
  projectId: number;
  compliancePercentage: number;
  averageResolutionTime: number;
  openIncidents: number;
  criticalIncidents: number;
  calculatedAt: string;
}

interface ProjectReportResponse {
  projectId: number;
  projectName: string;
  contractor: string | null;
  compliancePercentage: number;
  requiredDocuments: number;
  pendingDocuments: number;
  openIncidents: number;
  criticalIncidents: number;
}

@Injectable({ providedIn: 'root' })
export class ReportsHttpAdapter extends ReportsGateway {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1';

  listReports(): Observable<AuditReport[]> {
    return this.http
      .get<AuditReportResponse[]>(`${this.apiUrl}/reports`)
      .pipe(map((reports) => reports.map((report) => this.toReport(report))));
  }

  getReport(id: string): Observable<AuditReport> {
    return this.http
      .get<AuditReportResponse>(`${this.apiUrl}/reports/${id}`)
      .pipe(map((report) => this.toReport(report)));
  }

  generateReport(request: ReportExportRequest): Observable<AuditReport> {
    return this.http
      .post<AuditReportResponse>(`${this.apiUrl}/reports`, {
        ...request,
        projectId: Number(request.projectId),
      })
      .pipe(map((report) => this.toReport(report)));
  }

  getComplianceSummaries(): Observable<ComplianceSummary[]> {
    return this.http
      .get<ComplianceSummaryResponse[]>(`${this.apiUrl}/compliance/summary`)
      .pipe(map((summaries) => summaries.map((summary) => this.toSummary(summary))));
  }

  getEnvironmentalKpis(): Observable<EnvironmentalKpi[]> {
    return this.http
      .get<EnvironmentalKpiResponse[]>(`${this.apiUrl}/compliance/kpis`)
      .pipe(map((kpis) => kpis.map((kpi) => this.toKpi(kpi))));
  }

  getProjectReports(): Observable<ProjectReport[]> {
    return this.http
      .get<ProjectReportResponse[]>(`${this.apiUrl}/compliance/projects`)
      .pipe(map((projects) => projects.map((project) => this.toProject(project))));
  }

  exportPdf(reportId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reports/${reportId}/pdf`, { responseType: 'blob' });
  }

  private toReport(response: AuditReportResponse): AuditReport {
    return {
      id: String(response.id),
      projectId: String(response.projectId),
      projectName: response.projectName ?? `Proyecto #${response.projectId}`,
      periodStart: response.periodStart,
      periodEnd: response.periodEnd,
      status: response.status,
      generatedAt: response.generatedAt ?? undefined,
      issuedAt: response.generatedAt ?? undefined,
      fileUrl: response.fileUrl ?? undefined,
      sections: response.sections,
    };
  }

  private toSummary(response: ComplianceSummaryResponse): ComplianceSummary {
    return {
      id: String(response.id),
      projectId: String(response.projectId),
      compliantMeasurements: response.compliantMeasurements,
      nonCompliantMeasurements: response.nonCompliantMeasurements,
      compliancePercentage: response.compliancePercentage,
      calculatedAt: response.calculatedAt,
    };
  }

  private toKpi(response: EnvironmentalKpiResponse): EnvironmentalKpi {
    return {
      id: String(response.id),
      projectId: String(response.projectId),
      compliancePercentage: response.compliancePercentage,
      averageResolutionTime: response.averageResolutionTime,
      openIncidents: response.openIncidents,
      criticalIncidents: response.criticalIncidents,
      calculatedAt: response.calculatedAt,
    };
  }

  private toProject(response: ProjectReportResponse): ProjectReport {
    return {
      projectId: String(response.projectId),
      projectName: response.projectName,
      contractor: response.contractor ?? 'Sin contratista registrado',
      compliancePercentage: response.compliancePercentage,
      requiredDocuments: response.requiredDocuments,
      pendingDocuments: response.pendingDocuments,
      openIncidents: response.openIncidents,
      criticalIncidents: response.criticalIncidents,
    };
  }
}
