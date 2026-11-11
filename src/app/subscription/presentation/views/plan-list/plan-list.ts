import { Component, inject } from '@angular/core';
import { SubscriptionStore } from '../../../application/subscription.store';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';

@Component({
  selector: 'app-plan-list',
  imports: [AppShell],
  styleUrl: './plan-list.css',
  templateUrl: './plan-list.html',
})
export class PlanList {
  protected readonly store = inject(SubscriptionStore);
  protected readonly navigation = inject(AppNavigation).items;
}
