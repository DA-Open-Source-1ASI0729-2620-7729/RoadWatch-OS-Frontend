import { EnvironmentalKpi } from '../../domain/model/environmental-kpi';

export interface EnvironmentalKpiViewModel {
  code: string;
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: 'success' | 'warning' | 'danger' | 'neutral';
}

export const toEnvironmentalKpiViewModels = (
  kpi: EnvironmentalKpi,
): EnvironmentalKpiViewModel[] => [
  {
    code: `${kpi.id}-compliance`,
    label: `Cumplimiento · proyecto #${kpi.projectId}`,
    value: `${kpi.compliancePercentage}%`,
    detail: `Calculado: ${kpi.calculatedAt}`,
    icon: 'verified_user',
    tone: 'success',
  },
  {
    code: `${kpi.id}-resolution`,
    label: `Resolución · proyecto #${kpi.projectId}`,
    value: `${kpi.averageResolutionTime} h`,
    detail: 'Promedio de resolución',
    icon: 'schedule',
    tone: 'neutral',
  },
  {
    code: `${kpi.id}-open-incidents`,
    label: `Incidencias abiertas · proyecto #${kpi.projectId}`,
    value: String(kpi.openIncidents),
    detail: 'Incidencias activas',
    icon: 'fact_check',
    tone: 'warning',
  },
  {
    code: `${kpi.id}-critical-incidents`,
    label: `Incidencias críticas · proyecto #${kpi.projectId}`,
    value: String(kpi.criticalIncidents),
    detail: 'Requieren atención prioritaria',
    icon: 'crisis_alert',
    tone: 'danger',
  },
];
