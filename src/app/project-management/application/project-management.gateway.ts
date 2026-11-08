import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonitoringPoint } from '../domain/model/monitoring-point';
import { Project } from '../domain/model/project';

@Injectable({ providedIn: 'root' })
export abstract class ProjectManagementGateway {
  abstract getProjects(): Observable<Project[]>;
  abstract getProjectById(id: string): Observable<Project | undefined>;
  abstract getMonitoringPoints(projectId: string): Observable<MonitoringPoint[]>;
}
