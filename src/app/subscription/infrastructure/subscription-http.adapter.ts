import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { SubscriptionGateway } from '../application/subscription.gateway';
import { Plan } from '../domain/model/plan';
import { Subscription } from '../domain/model/subscription';

interface PlanResponse {
  id: number;
  name: Plan['type'];
  description: string;
  maxProjects: number;
  maxUsers: number;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class SubscriptionHttpAdapter extends SubscriptionGateway {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1';

  plans(): Observable<Plan[]> {
    return this.http.get<PlanResponse[]>(`${this.apiUrl}/plans`).pipe(
      map((plans) => plans.map((plan) => this.toPlan(plan))),
    );
  }

  current(): Observable<Subscription | null> {
    return of(null);
  }

  private toPlan(response: PlanResponse): Plan {
    return {
      id: String(response.id),
      type: response.name,
      name: this.planName(response.name),
      description: response.description,
      maxProjects: response.maxProjects,
      maxUsers: response.maxUsers,
      active: response.active,
    };
  }

  private planName(type: Plan['type']): string {
    return {
      BASE: 'Base',
      PROFESSIONAL: 'Profesional',
      ENTERPRISE: 'Enterprise',
    }[type];
  }
}
