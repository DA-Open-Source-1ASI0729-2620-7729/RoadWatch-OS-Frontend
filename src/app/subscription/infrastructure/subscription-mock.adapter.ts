import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubscriptionGateway } from '../application/subscription.gateway';
import { Plan } from '../domain/model/plan';
import { Subscription } from '../domain/model/subscription';

@Injectable({ providedIn: 'root' })
export class SubscriptionMockAdapter extends SubscriptionGateway {
  private readonly data: Plan[] = [
    {
      id: 'plan-base',
      type: 'BASE',
      name: 'Base',
      description: 'Operación inicial para equipos pequeños.',
      maxProjects: 1,
      maxUsers: 3,
      active: true,
    },
    {
      id: 'plan-professional',
      type: 'PROFESSIONAL',
      name: 'Professional',
      description: 'Seguimiento integral para operaciones en crecimiento.',
      maxProjects: 5,
      maxUsers: 15,
      active: true,
    },
    {
      id: 'plan-enterprise',
      type: 'ENTERPRISE',
      name: 'Enterprise',
      description: 'Capacidad ampliada para organizaciones complejas.',
      maxProjects: null,
      maxUsers: null,
      active: true,
    },
  ];
  private currentValue: Subscription = {
    id: 'subscription-01',
    accountId: 'account-01',
    plan: this.data[1],
    status: 'ACTIVE',
    startDate: '2026-01-01',
    updatedAt: '2026-11-08',
  };

  plans(): Observable<Plan[]> {
    return of(this.data);
  }

  current(): Observable<Subscription> {
    return of(this.currentValue);
  }

  change(planId: Plan['id']): Observable<Subscription> {
    const plan = this.data.find((item) => item.id === planId);
    if (plan) this.currentValue = { ...this.currentValue, plan, updatedAt: '2026-11-08' };
    return of(this.currentValue);
  }
}
