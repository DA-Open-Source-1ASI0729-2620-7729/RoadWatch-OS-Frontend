export type PlanType = 'BASE' | 'PROFESSIONAL' | 'ENTERPRISE';
export interface Plan {
  id: string;
  type: PlanType;
  name: string;
  description: string;
  maxProjects: number | null;
  maxUsers: number | null;
  active: boolean;
}
