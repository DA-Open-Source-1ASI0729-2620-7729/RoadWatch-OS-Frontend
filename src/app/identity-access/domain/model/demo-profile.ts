import { OrganizationSegment } from './organization-segment';
import { RoleType } from './role-type';

export interface DemoProfile {
  id: string;
  code: string;
  label: string;
  segment: OrganizationSegment;
  email: string;
  password: string;
  role: RoleType;
}
