import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProjectManagementGateway } from '../application/project-management.gateway';
import { MonitoringPoint } from '../domain/model/monitoring-point';
import { Project } from '../domain/model/project';

const projects: Project[] = [
  {
    id: 'PRY-003',
    name: 'Carretera Central – Tramo 2',
    description: 'Tramo vial en ejecución.',
    location: 'Junín',
    status: 'ACTIVE',
    responsibleUserId: 'u-e-02',
    createdAt: '2026-03-01',
    updatedAt: '2026-09-30',
  },
  {
    id: 'PRY-001',
    name: 'Panamericana Sur – Chilca',
    description: 'Proyecto vial en seguimiento.',
    location: 'Chilca, Lima',
    status: 'ACTIVE',
    responsibleUserId: 'u-e-02',
    createdAt: '2026-02-01',
    updatedAt: '2026-09-30',
  },
  {
    id: 'PRY-002',
    name: 'Longitudinal de la Sierra – Tramo 3',
    description: 'Proyecto vial en seguimiento.',
    location: 'Cajamarca',
    status: 'ACTIVE',
    responsibleUserId: 'u-e-02',
    createdAt: '2026-01-15',
    updatedAt: '2026-09-30',
  },
];

const monitoringPoints: MonitoringPoint[] = [
  {
    id: 'MP-01',
    projectId: 'PRY-003',
    name: 'Frente norte',
    latitude: -11.7612,
    longitude: -75.5102,
    normativeThresholdId: 'threshold-air-pm10',
    active: true,
  },
  {
    id: 'MP-02',
    projectId: 'PRY-003',
    name: 'Quebrada central',
    latitude: -11.7702,
    longitude: -75.4981,
    normativeThresholdId: 'threshold-noise',
    active: true,
  },
  {
    id: 'MP-03',
    projectId: 'PRY-003',
    name: 'Acopio sur',
    latitude: -11.7829,
    longitude: -75.4769,
    normativeThresholdId: 'threshold-air-pm25',
    active: true,
  },
];

@Injectable({ providedIn: 'root' })
export class ProjectManagementMockAdapter extends ProjectManagementGateway {
  getProjects(): Observable<Project[]> {
    return of(projects);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return of(projects.find((project) => project.id === id));
  }

  getMonitoringPoints(projectId: string): Observable<MonitoringPoint[]> {
    return of(monitoringPoints.filter((point) => point.projectId === projectId));
  }
}
