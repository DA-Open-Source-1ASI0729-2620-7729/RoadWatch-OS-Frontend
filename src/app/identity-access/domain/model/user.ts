import { Role } from './role';
import { UserStatus } from './user-status';
import { OrganizationSegment } from './organization-segment';
export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  organizationSegment: OrganizationSegment;
  role: Role;
}
