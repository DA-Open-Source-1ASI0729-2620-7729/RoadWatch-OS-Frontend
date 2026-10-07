import { Injectable, inject, signal } from '@angular/core';
import { IncidentGateway } from '../domain/gateways/incident.gateway';
import { EnvironmentalIncident, IncidentStatus } from '../domain/model/incident.model';

@Injectable()
export class IncidentStore {
  private readonly incidentGateway = inject(IncidentGateway);

  readonly incidents = signal<EnvironmentalIncident[]>([]);
  readonly loading = signal<boolean>(false);
  readonly selectedIncident = signal<EnvironmentalIncident | undefined>(undefined);

  loadIncidents(): void {
    this.loading.set(true);
    this.incidentGateway.getAllIncidents().subscribe({
      // Se agregó el tipo : EnvironmentalIncident[]
      next: (data: EnvironmentalIncident[]) => {
        this.incidents.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadIncidentById(id: string): void {
    this.loading.set(true);
    this.incidentGateway.getIncidentById(id).subscribe({
      // Se agregó el tipo : EnvironmentalIncident | undefined
      next: (data: EnvironmentalIncident | undefined) => {
        this.selectedIncident.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  updateStatus(id: string, newStatus: IncidentStatus): void {
    this.incidentGateway.updateIncidentStatus(id, newStatus).subscribe({
      // Se agregaron los tipos a los parámetros del callback
      next: (updatedIncident: EnvironmentalIncident) => {
        this.incidents.update((current: EnvironmentalIncident[]) => 
          current.map((inc: EnvironmentalIncident) => inc.id === id ? updatedIncident : inc)
        );
        if (this.selectedIncident()?.id === id) {
          this.selectedIncident.set(updatedIncident);
        }
      }
    });
  }
}
