export interface ProjectReport {
  projectId: string;
  projectName: string;
  contractor: string;
  compliancePercentage: number;
  requiredDocuments: number;
  pendingDocuments: number;
  openIncidents: number;
  criticalIncidents: number;
}
