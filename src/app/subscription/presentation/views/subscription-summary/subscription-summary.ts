import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubscriptionStore } from '../../../application/subscription.store';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';
@Component({
  selector: 'app-subscription-summary',
  imports: [RouterLink, AppShell],
  styleUrl: './subscription-summary.scss',
  templateUrl: './subscription-summary.html',
})
export class SubscriptionSummary {
  protected readonly store = inject(SubscriptionStore);
  protected readonly navigation = inject(AppNavigation).items;
}
