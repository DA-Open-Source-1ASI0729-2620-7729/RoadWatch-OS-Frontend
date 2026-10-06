import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { SubscriptionStore } from '../../../application/subscription.store';
import { AuthStore } from '../../../../identity-access/application/auth.store';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';
import { BillingCycle, Plan } from '../../../domain/model/plan';

@Component({
  selector: 'app-plan-list',
  imports: [AppShell, DecimalPipe],
  styleUrl: './plan-list.scss',
  templateUrl: './plan-list.html',
})
export class PlanList {
  protected readonly store = inject(SubscriptionStore);
  protected readonly billing = signal<BillingCycle>('MONTHLY');
  protected readonly navigation = inject(AppNavigation).items;
  private readonly auth = inject(AuthStore);
  protected readonly canChangePlan = computed(() => this.auth.user()?.role.type === 'ADMIN');

  protected select(plan: Plan): void {
    if (this.canChangePlan()) this.store.change(plan.type);
  }

  protected price(plan: Plan): number {
    return this.billing() === 'MONTHLY' ? plan.monthlyPrice : plan.annualMonthlyPrice;
  }
}
