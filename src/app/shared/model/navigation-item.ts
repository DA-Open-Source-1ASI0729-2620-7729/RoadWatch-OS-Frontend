import type { RoleType } from '../../identity-access/domain/model/role-type';
import type { OrganizationSegment } from '../../identity-access/domain/model/organization-segment';
export interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  badge?: string;
  section?: string;
  roles?: RoleType[];
  segments?: OrganizationSegment[];
}
