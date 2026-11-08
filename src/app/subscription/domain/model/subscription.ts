import { Plan } from './plan';

export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE' | 'CANCELLED';

export interface Subscription {
  id: string;
  accountId: string;
  plan: Plan;
  status: SubscriptionStatus;
  startDate: string;
  updatedAt: string;
}
