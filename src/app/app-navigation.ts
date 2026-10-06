import { Injectable, computed, inject } from '@angular/core';
import { NavigationItem } from './shared/model/navigation-item';
import { RoleType } from './identity-access/domain/model/role-type';
import { AuthStore } from './identity-access/application/auth.store';

export const APP_NAVIGATION: NavigationItem[] = [
  { label: 'Monitoreo', route: '/monitoring', icon: 'monitoring', section: 'OPERACIÓN' },
  { label: 'Incidencias', route: '/incidents', icon: 'crisis_alert', section: 'OPERACIÓN' },
  { label: 'Documentos', route: '/documents/normative', icon: 'folder_open', section: 'OPERACIÓN' },
  { label: 'Reportes', route: '/reports', icon: 'description', section: 'OPERACIÓN' },
  { label: 'Suscripción', route: '/subscription', icon: 'card_membership', section: 'ORGANIZACIÓN', roles: ['ADMIN', 'MANAGER'] },
  { label: 'Planes', route: '/subscription/plans', icon: 'workspace_premium', section: 'ORGANIZACIÓN', roles: ['ADMIN', 'MANAGER'] },
];

export const navigationForRole = (role: RoleType | null): NavigationItem[] =>
  APP_NAVIGATION.filter(item => !item.roles || (!!role && item.roles.includes(role)));

@Injectable({ providedIn: 'root' })
export class AppNavigation {
  private readonly auth = inject(AuthStore);
  readonly items = computed(() => navigationForRole(this.auth.user()?.role.type ?? 'AUDITOR'));
}
