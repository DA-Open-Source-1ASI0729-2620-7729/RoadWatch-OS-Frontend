import { IncidentStatus } from './incident.model';

export interface IncidentStatusHistory {
  id: string;
  incidentId: string;
  previousStatus: IncidentStatus;
  newStatus: IncidentStatus;
  changedByUserId: string;
  changedAt: string;
}
