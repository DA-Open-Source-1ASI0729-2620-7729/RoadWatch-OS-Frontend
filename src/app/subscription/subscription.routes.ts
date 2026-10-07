import { Routes } from '@angular/router';
const summary = () =>
  import('./presentation/views/subscription-summary/subscription-summary').then(
    (m) => m.SubscriptionSummary,
  );
const plans = () => import('./presentation/views/plan-list/plan-list').then((m) => m.PlanList);
export const subscriptionRoutes: Routes = [
  { path: '', loadComponent: summary, title: 'Suscripción | RoadWatch OS' },
  { path: 'plans', loadComponent: plans, title: 'Planes | RoadWatch OS' },
];
