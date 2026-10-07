export type PlanType = 'BASE' | 'PROFESSIONAL' | 'ENTERPRISE';
export type BillingCycle = 'MONTHLY' | 'ANNUAL';
export interface Plan {
  type: PlanType;
  name: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  features: string[];
}
