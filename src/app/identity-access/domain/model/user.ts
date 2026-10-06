import { Role } from './role'; import { UserStatus } from './user-status';
export interface User { id: string; name: string; email: string; status: UserStatus; role: Role; }
