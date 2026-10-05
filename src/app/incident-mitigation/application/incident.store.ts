import { Injectable, inject, signal } from '@angular/core';
import { IncidentGateway } from '../domain/gateways/incident.gateway';
import { EnvironmentalIncident, IncidentStatus } from '../domain/model/incident.model';

/**
 * Application state manager for the Incident Mitigation bounded context.
 * Utilizes Angular Signals to provide reactive state across the module's components.
 */
@Injectable({
  providedIn: 'root'
})
export class IncidentStore {
  /** Injected gateway abstracting data access */
  private readonly incidentGateway = inject(IncidentGateway);

  /** Signal holding the list of all loaded incidents */
  readonly incidents = signal<EnvironmentalIncident[]>([]);
  /** Signal indicating if a network request is currently active */
  readonly loading = signal<boolean>(false);
  /** Signal holding a single selected incident for detail views */
  readonly selectedIncident = signal<EnvironmentalIncident | undefined>(undefined);

  /**
   * Triggers the retrieval of all incidents from the gateway.
   * Updates the `loading` and `incidents` signals accordingly.
   */
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

  /**
   * Triggers the retrieval of a specific incident by its ID.
   * Updates the `loading` and `selectedIncident` signals accordingly.
   * 
   * @param id The unique identifier of the incident to load.
   */
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

  /**
   * Requests a status update for a specific incident.
   * Optimistically or reactively updates the `incidents` list and 
   * `selectedIncident` signals upon success.
   * 
   * @param id The unique identifier of the incident to update.
   * @param newStatus The new status to apply.
   */
  updateStatus(id: string, newStatus: IncidentStatus): void {
    this.incidentGateway.updateIncidentStatus(id, newStatus).subscribe({
      // Se agregaron los tipos a los parámetros del callback
      next: (updatedIncident: EnvironmentalIncident) => {
        // Update list
        this.incidents.update((current: EnvironmentalIncident[]) => 
          current.map((inc: EnvironmentalIncident) => inc.id === id ? updatedIncident : inc)
        );
        // Update detail view if it's currently selected
        if (this.selectedIncident()?.id === id) {
          this.selectedIncident.set(updatedIncident);
        }
      }
    });
  }
}