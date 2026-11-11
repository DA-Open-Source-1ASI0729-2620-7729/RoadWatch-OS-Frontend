export interface ComplianceSummary {
  id: string;
  projectId: string;
  compliantMeasurements: number;
  nonCompliantMeasurements: number;
  compliancePercentage: number;
  calculatedAt: string;
}
