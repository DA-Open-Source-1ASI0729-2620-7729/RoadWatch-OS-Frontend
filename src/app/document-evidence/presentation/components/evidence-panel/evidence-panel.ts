import { Component, input, output } from '@angular/core';

export interface EvidenceItem { id: string; name: string; type: 'image' | 'document'; author: string; createdAt: string; status: 'Cargada' | 'En revisión'; }

@Component({ selector: 'app-evidence-panel', styleUrl: './evidence-panel.scss', templateUrl: './evidence-panel.html' })
export class EvidencePanel {
  readonly evidence = input.required<EvidenceItem[]>();
  readonly uploadRequested = output<File>();
  readonly downloadRequested = output<EvidenceItem>();
  protected selectFile(event: Event): void { const file = (event.target as HTMLInputElement).files?.[0]; if (file) this.uploadRequested.emit(file); }
}
