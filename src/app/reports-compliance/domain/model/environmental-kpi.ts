export interface EnvironmentalKpi {
  id: string;
  projectId: string;
  compliancePercentage: number;
  averageResolutionTime: number;
  openIncidents: number;
  criticalIncidents: number;
  calculatedAt: string;
}
