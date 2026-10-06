/** Project-owned location referenced by Environmental Monitoring. It does not represent a device. */
export interface PuntoMonitoreo {
  id: string;
  proyectoId: string;
  nombre: string;
  progresiva: string;
  latitud: number;
  longitud: number;
  descripcion?: string;
}
