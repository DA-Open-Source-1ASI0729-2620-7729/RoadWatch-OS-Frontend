import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReportsStore } from '../../../application/reports.store';
import { AuditReport } from '../../../domain/model/audit-report';

@Component({ selector: 'app-report-list', imports: [RouterLink], styleUrl: './report-list.scss', templateUrl: './report-list.html' })
export class ReportList {
  protected readonly store = inject(ReportsStore);
  protected readonly selectedReport = signal<AuditReport | null>(null);
  protected readonly notification = signal('');
  protected open(report: AuditReport): void { this.selectedReport.set(report); }
  protected close(): void { this.selectedReport.set(null); }
  protected exportPdf(report: AuditReport): void { this.notification.set(`PDF de ${report.id} preparado para descarga.`); }
}
