export interface EnvironmentalKpi {
  code: string;
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: 'success' | 'warning' | 'danger' | 'neutral';
}
