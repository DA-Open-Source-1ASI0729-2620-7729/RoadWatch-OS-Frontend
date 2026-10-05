import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface EvidenceRecord { id: string; name: string; relation: string; type: 'Fotografía' | 'Documento'; author: string; date: string; status: 'Cargada' | 'En revisión'; }

@Component({ selector: 'app-evidence-library', imports: [RouterLink], styleUrl: './evidence-library.scss', templateUrl: './evidence-library.html' })
export class EvidenceLibrary {
  protected readonly notification = signal('');
  protected readonly evidence = signal<EvidenceRecord[]>([
    { id: 'EV-104', name: 'Foto frente de obra N-04.jpg', relation: 'Incidencia INC-0142', type: 'Fotografía', author: 'Jorge Ramos', date: '12/09/2026', status: 'Cargada' },
    { id: 'EV-105', name: 'Acta de verificación.pdf', relation: 'Auditoría mensual - Septiembre', type: 'Documento', author: 'EcoAudit', date: '12/09/2026', status: 'En revisión' },
    { id: 'EV-106', name: 'PM10 N-03 antes de mitigar.jpg', relation: 'Incidencia INC-0143', type: 'Fotografía', author: 'Rosa Vargas', date: '10/09/2026', status: 'Cargada' },
  ]);

  protected upload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.evidence.update(items => [{ id: crypto.randomUUID(), name: file.name, relation: 'Sin asociación', type: file.type.startsWith('image/') ? 'Fotografía' : 'Documento', author: 'EcoAudit', date: 'hoy', status: 'En revisión' }, ...items]);
    this.notification.set(`Evidencia “${file.name}” registrada para revisión.`);
  }

  protected download(item: EvidenceRecord): void { this.notification.set(`Preparando la descarga de ${item.name}.`); }
}
