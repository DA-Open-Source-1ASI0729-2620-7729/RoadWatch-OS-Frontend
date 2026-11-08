export interface MonitoringPoint {
  id: string;
  projectId: string;
  name: string;
  latitude: number;
  longitude: number;
  normativeThresholdId: string;
  active: boolean;
}
