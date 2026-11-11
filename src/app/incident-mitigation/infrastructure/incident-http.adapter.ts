import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { AuthStore } from '../../identity-access/application/auth.store';
import { IncidentGateway } from '../domain/gateways/incident.gateway';
import {
  EnvironmentalIncident,
  IncidentSeverity,
  IncidentStatus,
} from '../domain/model/incident.model';

interface EnvironmentalIncidentResponse {
  id: number;
  measurementId: number;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class IncidentHttpAdapter extends IncidentGateway {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthStore);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1/incidents';

  getAllIncidents(): Observable<EnvironmentalIncident[]> {
    return this.http
      .get<EnvironmentalIncidentResponse[]>(this.apiUrl)
      .pipe(map((incidents) => incidents.map((incident) => this.toIncident(incident))));
  }

  getIncidentById(id: string): Observable<EnvironmentalIncident | undefined> {
    return this.http
      .get<EnvironmentalIncidentResponse>(`${this.apiUrl}/${id}`)
      .pipe(map((incident) => this.toIncident(incident)));
  }

  updateIncidentStatus(id: string, status: IncidentStatus): Observable<EnvironmentalIncident> {
    const changedByUserId = Number(this.auth.user()?.id);
    if (!Number.isInteger(changedByUserId) || changedByUserId <= 0)
      return throwError(() => new Error('Se requiere una sesión válida para actualizar la incidencia.'));

    return this.http
      .patch<EnvironmentalIncidentResponse>(`${this.apiUrl}/${id}/status`, {
        status,
        changedByUserId,
      })
      .pipe(map((incident) => this.toIncident(incident)));
  }

  private toIncident(response: EnvironmentalIncidentResponse): EnvironmentalIncident {
    return {
      id: String(response.id),
      measurementId: String(response.measurementId),
      title: response.title,
      description: response.description,
      status: response.status,
      severity: response.severity,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
    };
  }
}
