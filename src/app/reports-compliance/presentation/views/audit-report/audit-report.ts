import { Component, computed, signal } from '@angular/core';

interface ReportSection { id: string; label: string; checked: boolean; }

@Component({ selector: 'app-audit-report', styleUrl: './audit-report.scss', templateUrl: './audit-report.html' })
export class AuditReport {
  protected readonly project = signal('Carretera Central – Tramo 2');
  protected readonly period = signal('01/09/2026 — 30/09/2026');
  protected readonly generated = signal(false);
  protected readonly notification = signal('');
  protected readonly sections = signal<ReportSection[]>([
    { id: 'summary', label: 'Resumen ejecutivo y salud ambiental', checked: true },
    { id: 'measurements', label: 'Lecturas por nodo y parámetro (tablas y gráficos)', checked: true },
    { id: 'incidents', label: 'Incidencias, acciones de mitigación y responsables', checked: true },
    { id: 'evidence', label: 'Evidencias fotográficas georreferenciadas', checked: true },
    { id: 'documents', label: 'Documentos normativos del hito (IGA, certificados)', checked: true },
    { id: 'hash', label: 'Anexo: cadena de hash de las lecturas', checked: false },
  ]);
  protected readonly selectedCount = computed(() => this.sections().filter(section => section.checked).length);

  protected toggleSection(id: string): void { this.sections.update(items => items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)); }
  protected generate(): void { this.generated.set(true); this.notification.set('Expediente generado en formato PDF.'); }
}
