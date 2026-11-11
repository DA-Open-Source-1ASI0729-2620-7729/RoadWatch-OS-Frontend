import { Injectable, inject, signal } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { SubscriptionGateway } from './subscription.gateway';
import { Plan } from '../domain/model/plan';
import { Subscription } from '../domain/model/subscription';
@Injectable({ providedIn: 'root' })
export class SubscriptionStore {
  private readonly gateway = inject(SubscriptionGateway);
  readonly plans = signal<Plan[]>([]);
  readonly subscription = signal<Subscription | null>(null);
  readonly changing = signal(false);
  readonly error = signal('');
  constructor() {
    this.gateway.plans().subscribe((plans) => this.plans.set(plans));
    this.gateway.current().subscribe((subscription) => this.subscription.set(subscription));
  }

  change(planId: Plan['id']): void {
    this.changing.set(true);
    this.error.set('');

    this.gateway
      .change(planId)
      .pipe(
        catchError(() => {
          this.error.set('No fue posible cambiar el plan.');
          return of(null);
        }),
        finalize(() => this.changing.set(false)),
      )
      .subscribe((subscription) => {
        if (subscription) this.subscription.set(subscription);
      });
  }
}
