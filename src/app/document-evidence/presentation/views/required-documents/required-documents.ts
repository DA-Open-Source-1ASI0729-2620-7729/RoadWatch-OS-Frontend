import { Component, computed, inject, signal } from '@angular/core';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';

interface RequiredDocument { name: string; milestone: string; type: string; status: 'Cargado' | 'Pendiente'; dueDate: string; }

@Component({ selector: 'app-required-documents', imports: [AppShell], styleUrl: './required-documents.scss', templateUrl: './required-documents.html' })
export class RequiredDocuments {
  protected readonly navigation = inject(AppNavigation).items;
  protected readonly filter = signal<'Todos' | 'Pendiente'>('Todos');
  protected readonly documents = signal<RequiredDocument[]>([
    { name: 'Certificado calibración N-08.pdf', milestone: 'Auditoría mensual - Septiembre', type: 'Certificado', status: 'Pendiente', dueDate: '30/09/2026' },
    { name: 'EIA-sd Carretera Central Tramo 2.pdf', milestone: 'Línea base ambiental', type: 'IGA', status: 'Cargado', dueDate: 'Completado' },
    { name: 'Plan de Manejo Ambiental.pdf', milestone: 'Línea base ambiental', type: 'IGA', status: 'Cargado', dueDate: 'Completado' },
  ]);
  protected readonly visibleDocuments = computed(() => this.filter() === 'Todos' ? this.documents() : this.documents().filter(document => document.status === 'Pendiente'));
  protected setFilter(filter: 'Todos' | 'Pendiente'): void { this.filter.set(filter); }
  protected upload(document: RequiredDocument): void { this.documents.update(items => items.map(item => item.name === document.name ? { ...item, status: 'Cargado', dueDate: 'Completado' } : item)); }
}
