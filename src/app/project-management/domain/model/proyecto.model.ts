export type EstadoProyecto = 'en_progreso' | 'pausado' | 'completado';

export interface Proyecto {
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
  estado: EstadoProyecto;
  fechaInicio: string;
  fechaFin: string;
  sensoresActivos: number;
  totalSensores: number;
  ultimaLectura: string;
}
