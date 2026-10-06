import { Injectable, computed, inject } from '@angular/core';
import { NavigationItem } from './shared/model/navigation-item';
import { RoleType } from './identity-access/domain/model/role-type';
import { OrganizationSegment } from './identity-access/domain/model/organization-segment';
import { AuthStore } from './identity-access/application/auth.store';

export const APP_NAVIGATION: NavigationItem[] = [
  { label: 'Proyectos', route: '/projects', icon: 'account_tree', section: 'OPERACIÓN', segments: ['CONSTRUCTION_COMPANY'] },
  { label: 'Monitoreo', route: '/monitoring', icon: 'monitoring', section: 'OPERACIÓN', segments: ['CONSTRUCTION_COMPANY'] },
  { label: 'Incidencias', route: '/incidents', icon: 'crisis_alert', section: 'OPERACIÓN', segments: ['CONSTRUCTION_COMPANY'] },
  { label: 'Evidencias y documentos', route: '/documents/evidence', icon: 'folder_open', section: 'OPERACIÓN', segments: ['CONSTRUCTION_COMPANY'] },
  { label: 'Reportes de proyecto', route: '/reports', icon: 'description', section: 'OPERACIÓN', segments: ['CONSTRUCTION_COMPANY'] },

  { label: 'Portafolio', route: '/projects', icon: 'account_tree', section: 'FISCALIZACIÓN', segments: ['SUPERVISORY_CONSULTANCY'] },
  { label: 'Historial de mediciones', route: '/monitoring/history', icon: 'monitoring', section: 'FISCALIZACIÓN', segments: ['SUPERVISORY_CONSULTANCY'] },
  { label: 'Incidencias críticas', route: '/incidents', icon: 'crisis_alert', section: 'FISCALIZACIÓN', segments: ['SUPERVISORY_CONSULTANCY'] },
  { label: 'Documentos normativos', route: '/documents/normative', icon: 'folder_open', section: 'FISCALIZACIÓN', segments: ['SUPERVISORY_CONSULTANCY'] },
  { label: 'Reportes de auditoría', route: '/reports/audit', icon: 'description', section: 'FISCALIZACIÓN', segments: ['SUPERVISORY_CONSULTANCY'] },
  { label: 'Cumplimiento', route: '/reports/compliance', icon: 'verified', section: 'FISCALIZACIÓN', segments: ['SUPERVISORY_CONSULTANCY'] },

  { label: 'Suscripción', route: '/subscription', icon: 'card_membership', section: 'ORGANIZACIÓN', roles: ['ADMIN', 'MANAGER'] },
  { label: 'Planes', route: '/subscription/plans', icon: 'workspace_premium', section: 'ORGANIZACIÓN', roles: ['ADMIN', 'MANAGER'] },
];

export const navigationForContext = (
  role: RoleType | null,
  segment: OrganizationSegment | null,
): NavigationItem[] => APP_NAVIGATION.filter((item) =>
  (!item.roles || (!!role && item.roles.includes(role))) &&
  (!item.segments || (!!segment && item.segments.includes(segment))),
);

@Injectable({ providedIn: 'root' })
export class AppNavigation {
  private readonly auth = inject(AuthStore);
  readonly items = computed(() => {
    const user = this.auth.user();
    return navigationForContext(user?.role.type ?? null, user?.organizationSegment ?? null);
  });
}
