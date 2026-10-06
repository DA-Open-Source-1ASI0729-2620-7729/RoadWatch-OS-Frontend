import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../domain/model/proyecto.model';
import { PuntoMonitoreo } from '../domain/model/punto-monitoreo.model';
import { Responsable } from '../domain/model/responsable.model';

@Injectable({ providedIn: 'root' })
export abstract class ProjectManagementGateway {
  abstract getProyectos(): Observable<Proyecto[]>;
  abstract getProyectoById(id: string): Observable<Proyecto | undefined>;
  abstract getPuntosMonitoreo(proyectoId: string): Observable<PuntoMonitoreo[]>;
  abstract getResponsables(proyectoId: string): Observable<Responsable[]>;
}
