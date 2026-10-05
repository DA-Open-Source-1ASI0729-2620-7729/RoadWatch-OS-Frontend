export type ComplianceStatus = 'En norma' | 'En observación' | 'Crítico';

export interface ComplianceKpi {
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: 'success' | 'warning' | 'danger' | 'neutral';
}

export interface ComplianceProject {
  id: string;
  name: string;
  contractor: string;
  health: number;
  mandatoryDocuments: string;
  openFindings: number;
  status: ComplianceStatus;
}
