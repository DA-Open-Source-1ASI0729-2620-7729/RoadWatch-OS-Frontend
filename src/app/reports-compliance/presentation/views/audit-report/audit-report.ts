import { Component, computed, inject, signal } from '@angular/core';
import { AuditReport as AuditReportModel } from '../../../domain/model/audit-report';
import { ReportExportRequest } from '../../../domain/model/report-export-request';
import { ReportsStore } from '../../../application/reports.store';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';

interface ReportSection {
  id: string;
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-audit-report',
  imports: [AppShell],
  styleUrl: './audit-report.scss',
  templateUrl: './audit-report.html',
})
export class AuditReport {
  protected readonly navigation = inject(AppNavigation).items;
  private readonly reportsStore = inject(ReportsStore);

  protected readonly project = signal('Carretera Central – Tramo 2');
  protected readonly period = signal('01/09/2026 — 30/09/2026');
  protected readonly generated = signal(false);
  protected readonly loading = signal(false);
  protected readonly generatedReport = signal<AuditReportModel | null>(null);
  protected readonly notification = signal('');
  protected readonly sections = signal<ReportSection[]>([
    { id: 'summary', label: 'Resumen ejecutivo y salud ambiental', checked: true },
    {
      id: 'measurements',
      label: 'Lecturas por nodo y parámetro (tablas y gráficos)',
      checked: true,
    },
    { id: 'incidents', label: 'Incidencias, acciones de mitigación y responsables', checked: true },
    { id: 'evidence', label: 'Evidencias fotográficas georreferenciadas', checked: true },
    { id: 'documents', label: 'Documentos normativos del hito (IGA, certificados)', checked: true },
    { id: 'hash', label: 'Anexo: cadena de hash de las lecturas', checked: false },
  ]);
  protected readonly selectedCount = computed(
    () => this.sections().filter((section) => section.checked).length,
  );

  protected toggleSection(id: string): void {
    this.sections.update((items) =>
      items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  }
  protected generate(): void {
    const request: ReportExportRequest = {
      projectId: 'p-01',
      periodStart: '2026-09-01',
      periodEnd: '2026-09-30',
      sections: this.sections()
        .filter((section) => section.checked)
        .map((section) => section.id),
      format: 'PDF',
    };

    this.loading.set(true);
    this.notification.set('');

    this.reportsStore.generateReport(request).subscribe({
      next: (report) => {
        this.generatedReport.set(report);
        this.generated.set(true);
        this.loading.set(false);
        this.notification.set('Expediente generado en formato PDF.');
      },
      error: () => {
        this.loading.set(false);
        this.notification.set('No se pudo generar el expediente. Inténtalo nuevamente.');
      },
    });
  }
}
