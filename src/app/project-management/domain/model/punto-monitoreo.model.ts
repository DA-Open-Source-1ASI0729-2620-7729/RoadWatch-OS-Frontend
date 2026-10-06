export type IndicadorAmbiental = 'aire' | 'ruido' | 'agua';
export type EstadoPunto = 'optimo' | 'advertencia' | 'critico' | 'sin_conexion';

export interface PuntoMonitoreo {
  id: string;
  proyectoId: string;
  progresiva: string;
  indicador: IndicadorAmbiental;
  parametro: string;
  lmp: string;
  nodoEnLinea: boolean;
  calibrado: string;
  ultimaLectura: string | null;
  estado: EstadoPunto;
  latitud: number;
  longitud: number;
  norma: string;
  advertenciaPct: number;
}
