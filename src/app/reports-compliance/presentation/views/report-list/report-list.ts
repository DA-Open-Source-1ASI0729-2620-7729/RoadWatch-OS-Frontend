import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReportsStore } from '../../../application/reports.store';
import { AuditReport, AuditReportStatus } from '../../../domain/model/audit-report';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';

@Component({
  selector: 'app-report-list',
  imports: [RouterLink, AppShell],
  styleUrl: './report-list.scss',
  templateUrl: './report-list.html',
})
export class ReportList {
  protected readonly navigation = inject(AppNavigation).items;
  protected readonly store = inject(ReportsStore);
  protected readonly selectedReport = signal<AuditReport | null>(null);
  protected readonly notification = signal('');
  protected readonly exportingReportId = signal<string | null>(null);
  protected readonly filtersOpen = signal(false);
  protected readonly statusFilter = signal<AuditReportStatus | 'Todos'>('Todos');
  protected readonly reportStatuses: Array<AuditReportStatus | 'Todos'> = [
    'Todos',
    'Borrador',
    'Emitido',
    'Observado',
  ];
  protected readonly filteredReports = computed(() => {
    const status = this.statusFilter();
    return status === 'Todos'
      ? this.store.reports()
      : this.store.reports().filter((report) => report.status === status);
  });

  protected open(report: AuditReport): void {
    this.notification.set('');
    this.store.getReport(report.id).subscribe({
      next: (detail) => this.selectedReport.set(detail),
      error: () => this.notification.set('No se pudo obtener el detalle del reporte.'),
    });
  }

  protected close(): void {
    this.selectedReport.set(null);
  }

  protected setStatusFilter(status: AuditReportStatus | 'Todos'): void {
    this.statusFilter.set(status);
    this.filtersOpen.set(false);
  }

  protected exportPdf(report: AuditReport): void {
    this.exportingReportId.set(report.id);
    this.store.exportPdf(report.id).subscribe({
      next: (pdf) => {
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
