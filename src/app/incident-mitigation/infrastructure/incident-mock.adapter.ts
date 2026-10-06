import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { IncidentGateway } from '../domain/gateways/incident.gateway';
import { EnvironmentalIncident, IncidentSeverity, IncidentStatus } from '../domain/model/incident.model';

/**
 * Mock implementation of the IncidentGateway.
 * Provides hardcoded data mimicking a real backend response, useful for 
 * development and testing without a live API.
 */
@Injectable({
  providedIn: 'root'
})
export class IncidentMockAdapter extends IncidentGateway {
  
  /** Hardcoded list of incidents based on UI mockups */
  private mockIncidents: EnvironmentalIncident[] = [
    {
      id: 'INC-0142',
      measurementId: 'm-101',
      alertId: 'a-101',
      title: 'Ruido sobre el LMP por maquinaria pesada',
      description: 'Lectura de ruido excedida en zona de excavación.',
      status: IncidentStatus.IN_PROGRESS,
      severity: IncidentSeverity.CRITICAL,
      monitoringPointLabel: 'Carretera Central · MP-04',
      indicator: 'Ruido',
      observedValue: 86,
      unit: 'dB(A)',
      responsible: 'Consorcio Vial Andino',
      evidenceCount: 2,
      mitigationCount: 1,
      dueDate: new Date(new Date().setHours(18, 0, 0, 0)),
      createdAt: new Date(new Date().setHours(9, 36, 0, 0)),
      updatedAt: new Date()
    },
    {
      id: 'INC-0231',
      measurementId: 'm-102',
      alertId: 'a-102',
      title: 'Alta concentración de material particulado',
      description: 'Exceso de polvo en movimiento de tierras.',
      status: IncidentStatus.OPEN,
      severity: IncidentSeverity.CRITICAL,
      monitoringPointLabel: 'Panamericana Sur · MP-02',
      indicator: 'PM10',
      observedValue: 142,
      unit: 'µg/m³',
      responsible: 'Obras del Sur',
      evidenceCount: 0,
      mitigationCount: 0,
      dueDate: new Date(new Date().setHours(20, 0, 0, 0)),
      createdAt: new Date(new Date().setHours(14, 0, 0, 0)),
      updatedAt: new Date()
    }
  ];

  /**
   * Retrieves all mock incidents with a simulated network delay.
   * 
   * @returns An Observable emitting the mock incidents array after 500ms.
   */
  override getAllIncidents(): Observable<EnvironmentalIncident[]> {
    return of(this.mockIncidents).pipe(delay(500)); 
  }

  /**
   * Finds a specific mock incident by ID with a simulated network delay.
   * 
   * @param id The ID to search for.
   * @returns An Observable emitting the matched incident or undefined after 300ms.
   */
  override getIncidentById(id: string): Observable<EnvironmentalIncident | undefined> {
    const incident = this.mockIncidents.find(i => i.id === id);
    return of(incident).pipe(delay(300));
  }

  /**
   * Updates the status of a mock incident in the local array.
   * 
   * @param id The ID of the incident to modify.
   * @param status The new status value.
   * @returns An Observable emitting the modified incident after 400ms.
   */
  override updateIncidentStatus(id: string, status: IncidentStatus): Observable<EnvironmentalIncident> {
    const incidentIndex = this.mockIncidents.findIndex(i => i.id === id);
    if (incidentIndex > -1) {
      this.mockIncidents[incidentIndex].status = status;
      this.mockIncidents[incidentIndex].updatedAt = new Date();
    }
    return of(this.mockIncidents[incidentIndex]).pipe(delay(400));
  }
}
