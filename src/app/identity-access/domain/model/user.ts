import { Role } from './role';
import { UserStatus } from './user-status';
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  passwordHash?: string;
  status: UserStatus;
  role: Role | null;
  createdAt?: string;
  updatedAt?: string;
}
