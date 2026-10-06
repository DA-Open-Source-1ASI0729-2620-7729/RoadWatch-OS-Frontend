import { Permission } from './permission'; import { RoleType } from './role-type';
export interface Role { type: RoleType; label: string; permissions: Permission[]; }
