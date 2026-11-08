import { MonitoringPoint } from '../../domain/model/monitoring-point';
import { Project } from '../../domain/model/project';

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

export interface ResponsibleViewModel {
  id: string;
  nombre: string;
  cargo: string;
  correo: string;
}

const projectDashboardData: Record<
  string,
  Omit<ProjectDashboardViewModel, 'id' | 'nombre' | 'ubicacion'>
> = {
  'PRY-003': {
    region: 'Junín',
    constructora: 'Consorcio Vial Andino',
    supervisor: 'Ing. Sofía Mendoza',
    saludAmbiental: 87,
    alertasActivas: 5,
    incidentes: 7,
    incidenciasCriticas: 2,
    estado: 'en_progreso',
    fechaInicio: '2026-03-01',
    fechaFin: '2027-03-31',
  },
  'PRY-001': {
    region: 'Lima',
    constructora: 'Obras del Sur SA',
    supervisor: 'Ing. María Torres',
    saludAmbiental: 64,
    alertasActivas: 9,
    incidentes: 12,
    incidenciasCriticas: 3,
    estado: 'en_progreso',
    fechaInicio: '2026-02-01',
    fechaFin: '2027-02-28',
  },
  'PRY-002': {
    region: 'Cajamarca',
    constructora: 'Vías del Norte SAC',
    supervisor: 'Ing. Carlos Rivas',
    saludAmbiental: 78,
    alertasActivas: 4,
    incidentes: 6,
    incidenciasCriticas: 1,
    estado: 'en_progreso',
    fechaInicio: '2026-01-15',
    fechaFin: '2027-06-15',
  },
};

const pointDisplayData: Record<
  string,
  Pick<MonitoringPointViewModel, 'progresiva' | 'descripcion'>
> = {
  'MP-01': { progresiva: 'Km 46+100', descripcion: 'Zona de obra norte' },
  'MP-02': { progresiva: 'Km 51+400', descripcion: 'Referencia de campo' },
  'MP-03': { progresiva: 'Km 62+800' },
};

const responsiblesByProject: Record<string, ResponsibleViewModel[]> = {
  'PRY-003': [
    {
      id: 'RES-003',
      nombre: 'Carlos Mendoza',
      cargo: 'Jefe de Proyectos Viales',
      correo: 'cmendoza@roadwatch.pe',
    },
    {
      id: 'RES-004',
      nombre: 'Sofía Mendoza',
      cargo: 'Supervisora ambiental',
      correo: 'smendoza@roadwatch.pe',
    },
  ],
};

export const toProjectDashboardViewModel = (project: Project): ProjectDashboardViewModel => ({
  id: project.id,
  nombre: project.name,
  ubicacion: project.location,
  ...projectDashboardData[project.id],
});

export const toMonitoringPointViewModel = (point: MonitoringPoint): MonitoringPointViewModel => ({
  id: point.id,
  nombre: point.name,
  ...pointDisplayData[point.id],
});

export const responsiblesForProject = (projectId: string): ResponsibleViewModel[] =>
  responsiblesByProject[projectId] ?? [];
