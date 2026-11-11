import type { RoleType } from '../../identity-access/domain/model/role-type';
export interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  badge?: string;
  section?: string;
  roles?: RoleType[];
}
