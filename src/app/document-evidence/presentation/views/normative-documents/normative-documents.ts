import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { NavigationItem } from '../../../../shared/model/navigation-item';
import { EvidenceItem, EvidencePanel } from '../../components/evidence-panel/evidence-panel';

type DocumentStatus = 'Cargado' | 'Falta';
interface NormativeDocument { name: string; type: string; version: string; uploadedBy: string; required: boolean; status: DocumentStatus; }

@Component({ selector: 'app-normative-documents', imports: [EvidencePanel, RouterLink, RouterLinkActive, AppShell], styleUrl: './normative-documents.scss', templateUrl: './normative-documents.html' })
export class NormativeDocuments {
  protected readonly navigation: NavigationItem[] = [{ label: 'Documentos normativos', route: '/documents/normative', icon: 'folder_open' }, { label: 'Evidencias', route: '/documents/evidence', icon: 'photo_library' }, { label: 'Documentos requeridos', route: '/documents/required', icon: 'fact_check' }, { label: 'Reportes', route: '/reports', icon: 'description' }];
  protected readonly selectedMilestone = signal('Auditoría mensual - Septiembre');
  protected readonly notification = signal('');
  protected readonly selectedFile = signal('');
  protected readonly pendingCount = computed(() => this.documents().filter(document => document.status === 'Falta').length);
  protected readonly selectedDocument = signal<NormativeDocument | null>(null);
  protected readonly evidence = signal<EvidenceItem[]>([
    { id: 'ev-01', name: 'Foto frente de obra N-04.jpg', type: 'image', author: 'Jorge Ramos', createdAt: '12/09', status: 'Cargada' },
    { id: 'ev-02', name: 'Acta de verificación.pdf', type: 'document', author: 'EcoAudit', createdAt: '12/09', status: 'En revisión' },
  ]);
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
  protected registerSelectedFile(): void {
    const name = this.selectedFile();
    if (!name) return;
    this.documents.update(items => [{ name, type: 'Documento', version: 'v1', uploadedBy: 'EcoAudit · hoy', required: false, status: 'Cargado' }, ...items]);
    this.selectedFile.set('');
    this.notification.set(`${name} fue registrado correctamente.`);
  }
  protected uploadMissing(document: NormativeDocument): void { this.documents.update(items => items.map(item => item.name === document.name ? { ...item, version: 'v1', uploadedBy: 'EcoAudit · hoy', status: 'Cargado' } : item)); this.notification.set(`${document.name} fue cargado correctamente.`); }
  protected download(document: NormativeDocument): void { this.notification.set(`Preparando la descarga de ${document.name}.`); }
  protected openDocument(document: NormativeDocument): void { this.selectedDocument.set(document); }
  protected closeDocument(): void { this.selectedDocument.set(null); }
  protected addEvidence(file: File): void {
    this.evidence.update(items => [...items, { id: crypto.randomUUID(), name: file.name, type: file.type.startsWith('image/') ? 'image' : 'document', author: 'EcoAudit', createdAt: 'hoy', status: 'En revisión' }]);
    this.notification.set(`Evidencia “${file.name}” agregada para revisión.`);
  }
  protected downloadEvidence(item: EvidenceItem): void { this.notification.set(`Preparando la descarga de ${item.name}.`); }
  protected closeMilestone(): void { this.notification.set(this.pendingCount() ? 'Completa los documentos requeridos antes de cerrar este hito.' : 'El hito está listo para cerrarse.'); }
}
