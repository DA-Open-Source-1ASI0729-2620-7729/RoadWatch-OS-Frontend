import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AuthStore } from '../../identity-access/application/auth.store';
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

interface SubscriptionResponse {
  id: number;
  accountId: number;
  planId: number;
  status: Subscription['status'];
  startDate: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class SubscriptionHttpAdapter extends SubscriptionGateway {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthStore);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1';

  plans(): Observable<Plan[]> {
    return this.http.get<PlanResponse[]>(`${this.apiUrl}/plans`).pipe(
      map((plans) => plans.map((plan) => this.toPlan(plan))),
    );
  }

  current(): Observable<Subscription | null> {
    const token = this.auth.token()?.value;
    if (!token) return of(null);

    return forkJoin({
      subscription: this.http.get<SubscriptionResponse>(`${this.apiUrl}/subscriptions/current`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }),
      plans: this.plans(),
    }).pipe(
      map(({ subscription, plans }) => this.toSubscription(subscription, plans)),
      catchError(() => of(null)),
    );
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

  private toSubscription(response: SubscriptionResponse, plans: Plan[]): Subscription | null {
    const plan = plans.find((item) => item.id === String(response.planId));
    if (!plan) return null;

    return {
      id: String(response.id),
      accountId: String(response.accountId),
      plan,
      status: response.status,
      startDate: response.startDate,
      updatedAt: response.updatedAt,
    };
  }
}
