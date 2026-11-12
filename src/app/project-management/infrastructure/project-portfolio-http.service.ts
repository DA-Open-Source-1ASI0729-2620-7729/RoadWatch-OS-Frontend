import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { ProjectDashboardViewModel } from '../presentation/model/project-dashboard.vm';

interface ProjectResponse {
  id: number;
  name: string;
  location: string;
  status: 'ACTIVE' | 'ARCHIVED';
  responsibleUserId: number | null;
  createdAt: string;
}

interface MonitoringPointResponse {
  id: number;
  projectId: number;
}

interface MeasurementResponse {
  id: number;
  monitoringPointId: number;
  status: 'COMPLIANT' | 'WARNING' | 'NON_COMPLIANT';
}

interface AlertResponse {
  measurementId: number;
  acknowledged: boolean;
}

interface IncidentResponse {
  measurementId: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectPortfolioHttpService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1';

  load(): Observable<ProjectDashboardViewModel[]> {
    return this.http.get<ProjectResponse[]>(`${this.apiUrl}/projects`, { params: { status: 'ACTIVE' } }).pipe(
      switchMap((projects) => {
        if (!projects.length) {
          return of({
            projects: [],
            points: [],
            measurements: [],
            alerts: [],
            incidents: [],
            users: [],
          });
        }

        const responsibleIds = [
          ...new Set(
            projects
              .map((project) => project.responsibleUserId)
              .filter((id): id is number => id !== null),
          ),
        ];
        return forkJoin({
          projects: of(projects),
          points: forkJoin(
            projects.map((project) =>
              this.http.get<MonitoringPointResponse[]>(`${this.apiUrl}/projects/${project.id}/monitoring-points`),
            ),
          ),
          measurements: this.http.get<MeasurementResponse[]>(`${this.apiUrl}/environmental-measurements`),
          alerts: this.http.get<AlertResponse[]>(`${this.apiUrl}/environmental-alerts`),
          incidents: this.http.get<IncidentResponse[]>(`${this.apiUrl}/incidents`),
          users: responsibleIds.length
            ? forkJoin(
                responsibleIds.map((userId) =>
                  this.http.get<UserResponse>(`${this.apiUrl}/users/${userId}`).pipe(catchError(() => of(null))),
                ),
              )
            : of([]),
        });
      }),
      map((data) => this.toViewModels(data)),
    );
  }

  private toViewModels(data: {
    projects: ProjectResponse[];
    points: MonitoringPointResponse[][];
    measurements: MeasurementResponse[];
    alerts: AlertResponse[];
    incidents: IncidentResponse[];
    users: Array<UserResponse | null>;
  }): ProjectDashboardViewModel[] {
    const users = new Map(data.users.filter((user): user is UserResponse => user !== null).map((user) => [user.id, user]));
    const pointsByProject = new Map(data.points.flat().map((point) => [point.id, point.projectId]));

    return data.projects.map((project) => {
      const measurements = data.measurements.filter(
        (measurement) => pointsByProject.get(measurement.monitoringPointId) === project.id,
      );
      const measurementIds = new Set(measurements.map((measurement) => measurement.id));
      const user = project.responsibleUserId ? users.get(project.responsibleUserId) : undefined;
      const health = this.environmentalHealth(measurements);

      return {
        id: String(project.id),
        nombre: project.name,
        ubicacion: project.location,
        region: project.location,
        constructora: 'No registrada',
        supervisor: user ? `${user.firstName} ${user.lastName}` : 'Sin asignar',
        saludAmbiental: health,
        alertasActivas: data.alerts.filter(
          (alert) => measurementIds.has(alert.measurementId) && !alert.acknowledged,
        ).length,
        incidentes: data.incidents.filter((incident) => measurementIds.has(incident.measurementId)).length,
        incidenciasCriticas: data.incidents.filter(
          (incident) => measurementIds.has(incident.measurementId) && incident.severity === 'CRITICAL',
        ).length,
        estado: project.status === 'ACTIVE' ? 'en_progreso' : 'pausado',
        fechaInicio: project.createdAt.slice(0, 10),
        fechaFin: 'No registrada',
      };
    });
  }

  private environmentalHealth(measurements: MeasurementResponse[]): number {
    if (!measurements.length) return 0;
    const score = { COMPLIANT: 100, WARNING: 65, NON_COMPLIANT: 0 };
    return Math.round(
      measurements.reduce((total, measurement) => total + score[measurement.status], 0) /
        measurements.length,
    );
  }
}
