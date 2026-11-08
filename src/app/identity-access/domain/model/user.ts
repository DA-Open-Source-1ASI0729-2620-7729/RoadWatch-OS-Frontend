import { Role } from './role';
import { UserStatus } from './user-status';
import { OrganizationSegment } from './organization-segment';
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  passwordHash?: string;
  status: UserStatus;
  organizationSegment: OrganizationSegment;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}
