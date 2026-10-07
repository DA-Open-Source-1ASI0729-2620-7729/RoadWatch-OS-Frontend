import {
  ApplicationConfig,
  computed,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProjectManagementGateway } from './project-management/application/project-management.gateway';
import { ProjectManagementMockAdapter } from './project-management/infrastructure/project-management.mock.adapter';
import { AuthStore } from './identity-access/application/auth.store';
import { User } from './identity-access/domain/model/user';
import { APP_SHELL_PROFILE, AppShellProfile } from './shared/model/app-shell-profile';

const shellProfile = (user: User | null): AppShellProfile => {
  const isConstruction = user?.organizationSegment === 'CONSTRUCTION_COMPANY';
  const initials =
    user?.name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() ?? 'RW';

  return {
    organization: isConstruction ? 'Consorcio Vial Andino' : 'EcoAudit Consultores',
    moduleName: isConstruction ? 'Módulo Operativo' : 'Módulo de Fiscalización',
    name: user?.name ?? 'Usuario RoadWatch',
    role: user?.role.label ?? 'Sesión no iniciada',
    initials,
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: APP_SHELL_PROFILE,
      useFactory: () => {
        const auth = inject(AuthStore);
        return computed(() => shellProfile(auth.user()));
      },
    },
    {
      provide: ProjectManagementGateway,
      useClass: ProjectManagementMockAdapter,
    },
  ],
};
