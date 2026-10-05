export interface ComplianceSummary {
  projectId?: string;
  compliancePercentage: number;
  requiredDocuments: number;
  pendingDocuments: number;
  openIncidents: number;
  criticalIncidents: number;
  averageResolutionHours?: number;
}
