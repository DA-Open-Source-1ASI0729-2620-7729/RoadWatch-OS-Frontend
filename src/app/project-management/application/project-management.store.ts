import { Injectable, signal, inject } from '@angular/core';
import { ProjectManagementGateway } from './project-management.gateway';
import { MonitoringPoint } from '../domain/model/monitoring-point';
import { Project } from '../domain/model/project';

@Injectable({ providedIn: 'root' })
export class ProjectManagementStore {
  private gateway = inject(ProjectManagementGateway);

  readonly projects = signal<Project[]>([]);
  readonly monitoringPoints = signal<MonitoringPoint[]>([]);
  readonly loading = signal(false);

  loadProjects(): void {
    this.loading.set(true);
    this.gateway.getProjects().subscribe((data) => {
      this.projects.set(data);
      this.loading.set(false);
    });
  }

  loadMonitoringPoints(projectId: string): void {
    this.loading.set(true);
    this.gateway.getMonitoringPoints(projectId).subscribe((data) => {
      this.monitoringPoints.set(data);
      this.loading.set(false);
    });
  }

  getProject(id: string) {
    return this.gateway.getProjectById(id);
  }
}
