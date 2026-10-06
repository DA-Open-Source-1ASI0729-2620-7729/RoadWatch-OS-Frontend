import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProjectManagementGateway } from '../application/project-management.gateway';
import { Proyecto } from '../domain/model/proyecto.model';
import { PuntoMonitoreo } from '../domain/model/punto-monitoreo.model';
import { Responsable } from '../domain/model/responsable.model';

const projects: Proyecto[] = [
  { id:'PRY-003', nombre:'Carretera Central – Tramo 2', ubicacion:'Junín', region:'Junín', constructora:'Consorcio Vial Andino', supervisor:'Ing. Sofía Mendoza', saludAmbiental:87, alertasActivas:5, incidentes:7, incidenciasCriticas:2, estado:'en_progreso', fechaInicio:'2026-03-01', fechaFin:'2027-03-31' },
  { id:'PRY-001', nombre:'Panamericana Sur – Chilca', ubicacion:'Chilca, Lima', region:'Lima', constructora:'Obras del Sur SA', supervisor:'Ing. María Torres', saludAmbiental:64, alertasActivas:9, incidentes:12, incidenciasCriticas:3, estado:'en_progreso', fechaInicio:'2026-02-01', fechaFin:'2027-02-28' },
  { id:'PRY-002', nombre:'Longitudinal de la Sierra – Tramo 3', ubicacion:'Cajamarca', region:'Cajamarca', constructora:'Vías del Norte SAC', supervisor:'Ing. Carlos Rivas', saludAmbiental:78, alertasActivas:4, incidentes:6, incidenciasCriticas:1, estado:'en_progreso', fechaInicio:'2026-01-15', fechaFin:'2027-06-15' },
];
const points: PuntoMonitoreo[] = [
  {id:'MP-01',proyectoId:'PRY-003',nombre:'Frente norte',progresiva:'Km 46+100',latitud:-11.7612,longitud:-75.5102,descripcion:'Zona de obra norte'},
  {id:'MP-02',proyectoId:'PRY-003',nombre:'Quebrada central',progresiva:'Km 51+400',latitud:-11.7702,longitud:-75.4981,descripcion:'Referencia de campo'},
  {id:'MP-03',proyectoId:'PRY-003',nombre:'Acopio sur',progresiva:'Km 62+800',latitud:-11.7829,longitud:-75.4769},
];
const responsables: Responsable[] = [
  {id:'RES-003',proyectoId:'PRY-003',nombre:'Carlos Mendoza',cargo:'Jefe de Proyectos Viales',correo:'cmendoza@roadwatch.pe'},
  {id:'RES-004',proyectoId:'PRY-003',nombre:'Sofía Mendoza',cargo:'Supervisora ambiental',correo:'smendoza@roadwatch.pe'},
];
@Injectable({providedIn:'root'})
export class ProjectManagementMockAdapter extends ProjectManagementGateway {
  getProyectos():Observable<Proyecto[]>{return of(projects)}
  getProyectoById(id:string):Observable<Proyecto|undefined>{return of(projects.find(item=>item.id===id))}
  getPuntosMonitoreo(projectId:string):Observable<PuntoMonitoreo[]>{return of(points.filter(item=>item.proyectoId===projectId))}
  getResponsables(projectId:string):Observable<Responsable[]>{return of(responsables.filter(item=>item.proyectoId===projectId))}
}
