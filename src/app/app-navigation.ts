import { Injectable, computed, inject } from '@angular/core';
import { NavigationItem } from './shared/model/navigation-item';
import { RoleType } from './identity-access/domain/model/role-type';
import { AuthStore } from './identity-access/application/auth.store';

export const APP_NAVIGATION: NavigationItem[] = [
  {
    label: 'Proyectos',
    route: '/projects',
    icon: 'account_tree',
    section: 'OPERACIÓN',
    roles: ['ADMIN', 'MANAGER', 'ENVIRONMENTAL_OFFICER'],
  },
  {
    label: 'Monitoreo',
    route: '/monitoring',
    icon: 'monitoring',
    section: 'OPERACIÓN',
    roles: ['ADMIN', 'MANAGER', 'ENVIRONMENTAL_OFFICER'],
  },
  {
    label: 'Incidencias',
    route: '/incidents',
    icon: 'crisis_alert',
    section: 'OPERACIÓN',
    roles: ['ADMIN', 'MANAGER', 'ENVIRONMENTAL_OFFICER'],
  },
  {
    label: 'Evidencias y documentos',
    route: '/documents/evidence',
    icon: 'folder_open',
    section: 'OPERACIÓN',
    roles: ['ADMIN', 'MANAGER', 'ENVIRONMENTAL_OFFICER'],
  },
  {
    label: 'Reportes de proyecto',
    route: '/reports',
    icon: 'description',
    section: 'OPERACIÓN',
    roles: ['ADMIN', 'MANAGER', 'ENVIRONMENTAL_OFFICER'],
  },

  {
    label: 'Portafolio',
    route: '/projects',
    icon: 'account_tree',
    section: 'FISCALIZACIÓN',
    roles: ['ADMIN', 'AUDITOR'],
  },
  {
    label: 'Historial de mediciones',
    route: '/monitoring/history',
    icon: 'monitoring',
    section: 'FISCALIZACIÓN',
    roles: ['ADMIN', 'AUDITOR'],
  },
  {
    label: 'Incidencias críticas',
    route: '/incidents',
    icon: 'crisis_alert',
    section: 'FISCALIZACIÓN',
    roles: ['ADMIN', 'AUDITOR'],
  },
  {
    label: 'Documentos normativos',
    route: '/documents/normative',
    icon: 'folder_open',
    section: 'FISCALIZACIÓN',
    roles: ['ADMIN', 'AUDITOR'],
  },
  {
    label: 'Reportes de auditoría',
    route: '/reports/audit',
    icon: 'description',
    section: 'FISCALIZACIÓN',
    roles: ['ADMIN', 'AUDITOR'],
  },
  {
    label: 'Cumplimiento',
    route: '/reports/compliance',
    icon: 'verified',
    section: 'FISCALIZACIÓN',
    roles: ['ADMIN', 'AUDITOR'],
  },

  {
    label: 'Suscripción',
    route: '/subscription',
    icon: 'card_membership',
    section: 'ORGANIZACIÓN',
    roles: ['ADMIN'],
  },
  {
    label: 'Planes',
    route: '/subscription/plans',
    icon: 'workspace_premium',
    section: 'ORGANIZACIÓN',
    roles: ['ADMIN'],
  },
];

export const navigationForContext = (
  role: RoleType | null,
): NavigationItem[] =>
  APP_NAVIGATION.filter(
    (item) => !item.roles || (!!role && item.roles.includes(role)),
  );

@Injectable({ providedIn: 'root' })
export class AppNavigation {
  private readonly auth = inject(AuthStore);
  readonly items = computed(() => {
    const user = this.auth.user();
    return navigationForContext(user?.role?.type ?? null);
  });
}
