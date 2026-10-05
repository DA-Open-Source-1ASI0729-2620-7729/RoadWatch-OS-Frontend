export enum IncidentSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum IncidentStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS', 
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  OVERDUE = 'OVERDUE'
}

export interface EnvironmentalIncident {
  id: string; // Ej: INC-0142
  measurementId: number;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  
  // Datos operativos mostrados en los mockups
  projectNode: string; 
  indicator: string; // Ej: Ruido, PM10
  currentValue: number;
  lmpValue: number;
  unit: string; // Ej: dB(A), µg/m³
  responsible: string;
  evidenceCount: number;
  dueDate: Date;

  createdAt: Date;
  updatedAt: Date;
}