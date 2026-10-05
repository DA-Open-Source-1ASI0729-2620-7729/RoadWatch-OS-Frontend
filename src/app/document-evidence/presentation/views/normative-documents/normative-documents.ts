import { Component, signal } from '@angular/core';

type DocumentStatus = 'Cargado' | 'Falta';
interface NormativeDocument { name: string; type: string; version: string; uploadedBy: string; required: boolean; status: DocumentStatus; }

@Component({ selector: 'app-normative-documents', styleUrl: './normative-documents.scss', templateUrl: './normative-documents.html' })
export class NormativeDocuments {
  protected readonly selectedMilestone = signal('Auditoría mensual - Septiembre');
  protected readonly notification = signal('');
  protected readonly selectedFile = signal('');
  protected readonly milestones = [
    { name: 'Línea base ambiental', progress: '5/5 documentos', complete: true },
    { name: 'Auditoría mensual - Septiembre', progress: '4/5 documentos', complete: false },
    { name: 'Auditoría mensual - Octubre', progress: '0/5 documentos', complete: false },
    { name: 'Cierre de obra', progress: '0/8 documentos', complete: false },
  ];
  protected readonly documents = signal<NormativeDocument[]>([
    { name: 'EIA-sd Carretera Central Tramo 2.pdf', type: 'IGA', version: 'v3', uploadedBy: 'EcoAudit · 12/09', required: true, status: 'Cargado' },
    { name: 'Plan de Manejo Ambiental.pdf', type: 'IGA', version: 'v2', uploadedBy: 'EcoAudit · 02/09', required: true, status: 'Cargado' },
    { name: 'Informe de monitoreo agosto.pdf', type: 'Reporte', version: 'v1', uploadedBy: 'RoadWatch · 01/09', required: true, status: 'Cargado' },
    { name: 'Certificado calibración N-01–N-07.pdf', type: 'Certificado', version: 'v1', uploadedBy: 'VíaNexo · 15/07', required: true, status: 'Cargado' },
    { name: 'Certificado calibración N-08.pdf', type: 'Certificado', version: '—', uploadedBy: '—', required: true, status: 'Falta' },
    { name: 'Acta de visita de campo.pdf', type: 'Acta', version: 'v1', uploadedBy: 'EcoAudit · 20/09', required: false, status: 'Cargado' },
  ]);
  protected chooseMilestone(name: string): void { this.selectedMilestone.set(name); }
  protected onFileSelected(event: Event): void { const file = (event.target as HTMLInputElement).files?.[0]; if (file) { this.selectedFile.set(file.name); this.notification.set(`Archivo “${file.name}” listo para registrar.`); } }
  protected uploadMissing(document: NormativeDocument): void { this.documents.update(items => items.map(item => item.name === document.name ? { ...item, version: 'v1', uploadedBy: 'EcoAudit · hoy', status: 'Cargado' } : item)); this.notification.set(`${document.name} fue cargado correctamente.`); }
  protected download(document: NormativeDocument): void { this.notification.set(`Preparando la descarga de ${document.name}.`); }
  protected closeMilestone(): void { this.notification.set('Completa los documentos requeridos antes de cerrar este hito.'); }
}
