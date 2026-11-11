import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProjectManagementGateway } from '../application/project-management.gateway';
import { MonitoringPoint } from '../domain/model/monitoring-point';
import { Project, ProjectStatus } from '../domain/model/project';

interface ProjectResponse {
  id: number;
  name: string;
  description: string;
  location: string;
  status: ProjectStatus;
  responsibleUserId: number | null;
  createdAt: string;
  updatedAt: string;
}

interface MonitoringPointResponse {
  id: number;
  projectId: number;
  name: string;
  latitude: number;
  longitude: number;
  normativeThresholdId: number | null;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectManagementHttpAdapter extends ProjectManagementGateway {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1';

  getProjects(): Observable<Project[]> {
    return this.http
      .get<ProjectResponse[]>(`${this.apiUrl}/projects`, { params: { status: 'ACTIVE' } })
      .pipe(map((projects) => projects.map((project) => this.toProject(project))));
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return this.http
      .get<ProjectResponse>(`${this.apiUrl}/projects/${id}`)
      .pipe(map((project) => this.toProject(project)));
  }

  getMonitoringPoints(projectId: string): Observable<MonitoringPoint[]> {
    return this.http
      .get<MonitoringPointResponse[]>(`${this.apiUrl}/projects/${projectId}/monitoring-points`)
      .pipe(map((points) => points.map((point) => this.toMonitoringPoint(point))));
  }

  private toProject(response: ProjectResponse): Project {
    return {
      id: String(response.id),
      name: response.name,
      description: response.description,
      location: response.location,
      status: response.status,
      responsibleUserId: response.responsibleUserId ? String(response.responsibleUserId) : null,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }

  private toMonitoringPoint(response: MonitoringPointResponse): MonitoringPoint {
    return {
      id: String(response.id),
      projectId: String(response.projectId),
      name: response.name,
      latitude: response.latitude,
      longitude: response.longitude,
      normativeThresholdId: response.normativeThresholdId
        ? String(response.normativeThresholdId)
        : null,
      active: response.active,
    };
  }
}
