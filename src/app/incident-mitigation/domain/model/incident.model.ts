export enum IncidentSeverity { LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH', CRITICAL = 'CRITICAL' }
export enum IncidentStatus { OPEN = 'OPEN', IN_PROGRESS = 'IN_PROGRESS', RESOLVED = 'RESOLVED', CLOSED = 'CLOSED', OVERDUE = 'OVERDUE' }

export interface EnvironmentalIncident {
  id: string;
  measurementId: string;
  alertId?: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  monitoringPointLabel: string;
  indicator: string;
  observedValue: number;
  unit: string;
  responsible: string;
  evidenceCount: number;
  mitigationCount: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MitigationAction { id: string; incidentId: string; description: string; responsible: string; status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'; createdAt: Date; }
