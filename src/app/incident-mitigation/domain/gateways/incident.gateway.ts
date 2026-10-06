import { Observable } from 'rxjs';
import { EnvironmentalIncident, IncidentStatus } from '../model/incident.model';

/**
 * Abstract gateway defining the contract for incident data operations.
 * Acts as an outbound port in the Hexagonal Architecture, allowing the application
 * layer to fetch and mutate data without knowing the underlying infrastructure.
 */
export abstract class IncidentGateway {
  
  /**
   * Retrieves all environmental incidents.
   * 
   * @returns An Observable emitting an array of all environmental incidents.
   */
  abstract getAllIncidents(): Observable<EnvironmentalIncident[]>;

  /**
   * Retrieves a specific environmental incident by its unique identifier.
   * 
   * @param id The unique identifier of the incident to retrieve.
   * @returns An Observable emitting the found incident or undefined if not found.
   */
  abstract getIncidentById(id: string): Observable<EnvironmentalIncident | undefined>;

  /**
   * Updates the workflow status of a specific environmental incident.
   * 
   * @param id The unique identifier of the incident to update.
   * @param status The new status to apply to the incident.
   * @returns An Observable emitting the updated environmental incident.
   */
  abstract updateIncidentStatus(id: string, status: IncidentStatus): Observable<EnvironmentalIncident>;
}