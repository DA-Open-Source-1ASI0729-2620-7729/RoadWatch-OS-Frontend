import { MonitoringPoint } from '../../domain/model/monitoring-point';

export interface ProjectDashboardViewModel {
  id: string;
  nombre: string;
  ubicacion: string;
  region: string;
  constructora: string;
  supervisor: string;
  saludAmbiental: number;
  alertasActivas: number;
  incidentes: number;
  incidenciasCriticas: number;
  estado: 'en_progreso' | 'pausado' | 'completado';
  fechaInicio: string;
  fechaFin: string;
}

export interface MonitoringPointViewModel {
  id: string;
  nombre: string;
  progresiva: string;
  descripcion?: string;
}

export const toMonitoringPointViewModel = (point: MonitoringPoint): MonitoringPointViewModel => ({
  id: point.id,
  nombre: point.name,
  progresiva: `${point.latitude.toFixed(4)}, ${point.longitude.toFixed(4)}`,
  descripcion: point.normativeThresholdId
    ? `Umbral normativo ${point.normativeThresholdId}`
    : undefined,
});
