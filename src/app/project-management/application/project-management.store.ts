import { Injectable, signal, inject } from '@angular/core';
import { ProjectManagementGateway } from './project-management.gateway';
import { Proyecto } from '../domain/model/proyecto.model';
import { PuntoMonitoreo } from '../domain/model/punto-monitoreo.model';

@Injectable({ providedIn: 'root' })
export class ProjectManagementStore {
  private gateway = inject(ProjectManagementGateway);

  readonly proyectos = signal<Proyecto[]>([]);
  readonly puntos = signal<PuntoMonitoreo[]>([]);
  readonly loading = signal(false);

  loadProyectos(): void {
    this.loading.set(true);
    this.gateway.getProyectos().subscribe((data) => {
      this.proyectos.set(data);
      this.loading.set(false);
    });
  }

  loadPuntos(proyectoId: string): void {
    this.loading.set(true);
    this.gateway.getPuntosMonitoreo(proyectoId).subscribe((data) => {
      this.puntos.set(data);
      this.loading.set(false);
    });
  }

  updatePunto(punto: PuntoMonitoreo): void {
    this.puntos.update((lista) => lista.map((p) => (p.id === punto.id ? punto : p)));
  }
}
