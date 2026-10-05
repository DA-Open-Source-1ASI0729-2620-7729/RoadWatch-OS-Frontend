/**
 * Defines the possible severity levels for an environmental incident.
 */
export enum IncidentSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

/**
 * Defines the lifecycle states of an environmental incident.
 */
export enum IncidentStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS', 
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  OVERDUE = 'OVERDUE'
}

/**
 * Represents the core domain entity for an Environmental Incident.
 * Contains both business rules and operational data needed for UI representation.
 */
export interface EnvironmentalIncident {
  /** Unique identifier of the incident (e.g., INC-0142) */
  id: string; 
  /** Foreign key linking to the specific environmental measurement */
  measurementId: number;
  /** Short descriptive title of the issue */
  title: string;
  /** Detailed explanation of the incident */
  description: string;
  /** Current state in the mitigation workflow */
  status: IncidentStatus;
  /** Impact level of the incident */
  severity: IncidentSeverity;
  
  /** Location or node identifier (e.g., Carretera Central N-04) */
  projectNode: string; 
  /** Type of environmental indicator evaluated (e.g., Ruido, PM10) */
  indicator: string; 
  /** The actual measurement value recorded */
  currentValue: number;
  /** The Maximum Permissible Limit (LMP) allowed for this indicator */
  lmpValue: number;
  /** Measurement unit (e.g., dB(A), µg/m³) */
  unit: string; 
  /** Entity or person in charge of mitigating the incident */
  responsible: string;
  /** Number of evidence items (photos/documents) attached */
  evidenceCount: number;
  /** Deadline for mitigating the incident */
  dueDate: Date;

  /** Timestamp when the incident was registered */
  createdAt: Date;
  /** Timestamp of the last modification */
  updatedAt: Date;
}