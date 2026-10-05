import { Injectable, computed, signal } from '@angular/core';
import { ComplianceKpi, ComplianceProject } from '../domain/model/compliance-kpi';

@Injectable({ providedIn: 'root' })
export class ComplianceStore {
  private readonly projectsSignal = signal<ComplianceProject[]>([
    { id: 'p-01', name: 'Carretera Central – Tramo 2', contractor: 'Consorcio Vial Andino', health: 87, mandatoryDocuments: '7 / 8', openFindings: 1, status: 'En observación' },
    { id: 'p-02', name: 'Vía de Evitamiento Norte', contractor: 'Constructora Pacífico SAC', health: 96, mandatoryDocuments: '8 / 8', openFindings: 0, status: 'En norma' },
    { id: 'p-03', name: 'Panamericana Sur – Chilca', contractor: 'Obras del Sur SA', health: 64, mandatoryDocuments: '5 / 8', openFindings: 3, status: 'Crítico' },
  ]);

  readonly projects = this.projectsSignal.asReadonly();
  readonly averageHealth = computed(() => Math.round(this.projects().reduce((total, project) => total + project.health, 0) / this.projects().length));
  readonly kpis = computed<ComplianceKpi[]>(() => [
    { label: 'Cumplimiento ambiental', value: `${this.averageHealth()}%`, detail: 'promedio de proyectos supervisados', icon: 'verified_user', tone: 'success' },
    { label: 'Documentos obligatorios', value: '20 / 24', detail: '4 documentos pendientes', icon: 'folder_open', tone: 'warning' },
    { label: 'Hallazgos abiertos', value: '4', detail: '1 requiere atención inmediata', icon: 'fact_check', tone: 'danger' },
    { label: 'Reportes emitidos', value: '14', detail: 'durante septiembre', icon: 'description', tone: 'neutral' },
  ]);
}
