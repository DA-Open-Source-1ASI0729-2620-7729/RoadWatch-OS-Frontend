import { Injectable, inject, signal } from '@angular/core';
import { SubscriptionGateway } from './subscription.gateway';
import { Plan } from '../domain/model/plan';
import { Subscription } from '../domain/model/subscription';
@Injectable({ providedIn: 'root' })
export class SubscriptionStore {
  private readonly gateway = inject(SubscriptionGateway);
  readonly plans = signal<Plan[]>([]);
  readonly subscription = signal<Subscription | null>(null);
  constructor() {
    this.gateway.plans().subscribe((plans) => this.plans.set(plans));
    this.gateway.current().subscribe((subscription) => this.subscription.set(subscription));
  }
}
