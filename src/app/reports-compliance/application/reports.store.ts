import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuditReport } from '../domain/model/audit-report';
import { ReportExportRequest } from '../domain/model/report-export-request';
import { ReportsApi } from '../infrastructure/reports-api';

@Injectable({ providedIn: 'root' })
export class ReportsStore {
  private readonly api = inject(ReportsApi);
  readonly reports = signal<AuditReport[]>([]);
  readonly loading = signal(true);

  constructor() { this.refresh(); }

  refresh(): void { this.loading.set(true); this.api.listReports().subscribe(reports => { this.reports.set(reports); this.loading.set(false); }); }

  getReport(id: string): Observable<AuditReport> { return this.api.getReport(id); }

  generateReport(request: ReportExportRequest): Observable<AuditReport> {
    return this.api.generateReport(request).pipe(
      tap(report => this.reports.update(reports => [report, ...reports.filter(item => item.id !== report.id)])),
    );
  }

  exportPdf(reportId: string): Observable<Blob> { return this.api.exportPdf(reportId); }
}
