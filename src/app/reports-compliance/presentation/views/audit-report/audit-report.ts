import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuditReport as AuditReportModel } from '../../../domain/model/audit-report';
import { ReportExportRequest } from '../../../domain/model/report-export-request';
import { ReportsStore } from '../../../application/reports.store';
import { ProjectManagementGateway } from '../../../../project-management/application/project-management.gateway';
import { Project } from '../../../../project-management/domain/model/project';
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
  styleUrl: './audit-report.css',
  templateUrl: './audit-report.html',
})
export class AuditReport implements OnInit {
  protected readonly navigation = inject(AppNavigation).items;
  private readonly reportsStore = inject(ReportsStore);
  private readonly projectGateway = inject(ProjectManagementGateway);

  protected readonly projectId = signal('');
  protected readonly projects = signal<Project[]>([]);
  protected readonly periodStart = signal('');
  protected readonly periodEnd = signal('');
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
  protected readonly selectedProject = computed(() =>
    this.projects().find((project) => project.id === this.projectId()),
  );

  ngOnInit(): void {
    this.projectGateway.getProjects().subscribe((projects) => this.projects.set(projects));
  }

  protected toggleSection(id: string): void {
    this.sections.update((items) =>
      items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  }
  protected generate(): void {
    const request: ReportExportRequest = {
      projectId: this.projectId(),
      periodStart: this.periodStart(),
      periodEnd: this.periodEnd(),
      sections: this.sections()
        .filter((section) => section.checked)
        .map((section) => section.id),
      format: 'PDF',
    };

    if (!request.projectId || !request.periodStart || !request.periodEnd || !request.sections.length) {
      this.notification.set('Completa el proyecto, el periodo y al menos una sección.');
      return;
    }

    this.loading.set(true);
    this.notification.set('');

    this.reportsStore.generateReport(request).subscribe({
      next: (report) => {
        this.generatedReport.set(report);
        this.generated.set(true);
        this.reportsStore.exportPdf(report.id).subscribe({
          next: (file) => {
            const url = URL.createObjectURL(file);
            const link = window.document.createElement('a');
            link.href = url;
            link.download = `expediente-${report.id}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
            this.loading.set(false);
            this.notification.set('Expediente generado y descargado en formato PDF.');
          },
          error: () => {
            this.loading.set(false);
            this.notification.set('El expediente fue creado, pero no se pudo descargar el PDF.');
          },
        });
      },
      error: () => {
        this.loading.set(false);
        this.notification.set('No se pudo generar el expediente. Inténtalo nuevamente.');
      },
    });
  }
}
