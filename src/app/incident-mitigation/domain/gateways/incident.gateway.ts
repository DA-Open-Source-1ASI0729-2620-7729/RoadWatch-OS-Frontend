import { Observable } from 'rxjs';
import { EnvironmentalIncident } from '../model/incident.model.ts';

export abstract class IncidentGateway {
  abstract getAllIncidents(): Observable<EnvironmentalIncident[]>;
  abstract getIncidentById(id: string): Observable<EnvironmentalIncident | undefined>;
  abstract updateIncidentStatus(id: string, status: IncidentStatus): Observable<EnvironmentalIncident>;
}