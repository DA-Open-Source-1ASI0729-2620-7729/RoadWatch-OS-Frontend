import { Routes } from '@angular/router';
import { requirePermission } from '../identity-access/application/permission.guard';
const summary = () =>
  import('./presentation/views/subscription-summary/subscription-summary').then(
    (m) => m.SubscriptionSummary,
  );
const plans = () => import('./presentation/views/plan-list/plan-list').then((m) => m.PlanList);
export const subscriptionRoutes: Routes = [
  {
    path: '',
    loadComponent: summary,
    title: 'Suscripción | RoadWatch OS',
    canActivate: [requirePermission('subscription.read')],
  },
  {
    path: 'plans',
    loadComponent: plans,
    title: 'Planes | RoadWatch OS',
    canActivate: [requirePermission('subscription.change')],
  },
];
