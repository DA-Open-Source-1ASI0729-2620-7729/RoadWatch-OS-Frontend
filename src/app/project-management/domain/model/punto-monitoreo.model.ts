export interface PuntoMonitoreo {
  id: string;
  proyectoId: string;
  nombre: string;
  progresiva: string;
  latitud: number;
  longitud: number;
  descripcion?: string;
}
