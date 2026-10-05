import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReportsStore } from '../../../application/reports.store';
import { AuditReport } from '../../../domain/model/audit-report';

@Component({ selector: 'app-report-list', imports: [RouterLink], styleUrl: './report-list.scss', templateUrl: './report-list.html' })
export class ReportList {
  protected readonly store = inject(ReportsStore);
  protected readonly selectedReport = signal<AuditReport | null>(null);
  protected readonly notification = signal('');
  protected readonly exportingReportId = signal<string | null>(null);

  protected open(report: AuditReport): void {
    this.notification.set('');
    this.store.getReport(report.id).subscribe({
      next: detail => this.selectedReport.set(detail),
      error: () => this.notification.set('No se pudo obtener el detalle del reporte.'),
    });
  }

  protected close(): void { this.selectedReport.set(null); }

  protected exportPdf(report: AuditReport): void {
    this.exportingReportId.set(report.id);
    this.store.exportPdf(report.id).subscribe({
      next: pdf => {
        const url = URL.createObjectURL(pdf);
        const link = document.createElement('a');
        link.href = url;
        link.download = `expediente-${report.id}.pdf`;
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        this.exportingReportId.set(null);
        this.notification.set(`PDF de ${report.id} descargado.`);
      },
      error: () => {
        this.exportingReportId.set(null);
        this.notification.set('No se pudo exportar el PDF. Inténtalo nuevamente.');
      },
    });
  }
}
