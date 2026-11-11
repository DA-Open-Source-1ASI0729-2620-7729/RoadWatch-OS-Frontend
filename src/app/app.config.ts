import {
  ApplicationConfig,
  computed,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProjectManagementGateway } from './project-management/application/project-management.gateway';
import { ProjectManagementHttpAdapter } from './project-management/infrastructure/project-management-http.adapter';
import { SubscriptionGateway } from './subscription/application/subscription.gateway';
import { SubscriptionMockAdapter } from './subscription/infrastructure/subscription-mock.adapter';
import { EnvironmentalMonitoringGateway } from './environmental-monitoring/application/environmental-monitoring.gateway';
import { EnvironmentalMonitoringHttpAdapter } from './environmental-monitoring/infrastructure/environmental-monitoring-http.adapter';
import { AuthGateway } from './identity-access/application/auth.gateway';
import { AuthHttpAdapter } from './identity-access/infrastructure/auth-http.adapter';
import { ReportsGateway } from './reports-compliance/application/reports.gateway';
import { ReportsMockAdapter } from './reports-compliance/infrastructure/reports-mock.adapter';
import { EvidenceGateway } from './document-evidence/application/evidence.gateway';
import { EvidenceHttpAdapter } from './document-evidence/infrastructure/evidence-http.adapter';
import { NormativeDocumentGateway } from './document-evidence/application/normative-document.gateway';
import { NormativeDocumentHttpAdapter } from './document-evidence/infrastructure/normative-document-http.adapter';
import { RequiredDocumentGateway } from './document-evidence/application/required-document.gateway';
import { RequiredDocumentHttpAdapter } from './document-evidence/infrastructure/required-document-http.adapter';
import { AuthStore } from './identity-access/application/auth.store';
import { User } from './identity-access/domain/model/user';
import { APP_SHELL_PROFILE, AppShellProfile } from './shared/model/app-shell-profile';

const shellProfile = (user: User | null): AppShellProfile => {
  const initials =
    user?.name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() ?? 'RW';

  return {
    organization: 'RoadWatch OS',
    moduleName: 'Plataforma de gestión ambiental',
    name: user?.name ?? 'Usuario RoadWatch',
    role: user?.role?.label ?? 'Sesión no iniciada',
    initials,
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
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
      useClass: ProjectManagementHttpAdapter,
    },
    {
      provide: SubscriptionGateway,
      useClass: SubscriptionMockAdapter,
    },
    {
      provide: EnvironmentalMonitoringGateway,
      useClass: EnvironmentalMonitoringHttpAdapter,
    },
    {
      provide: AuthGateway,
      useClass: AuthHttpAdapter,
    },
    {
      provide: ReportsGateway,
      useClass: ReportsMockAdapter,
    },
    {
      provide: EvidenceGateway,
      useClass: EvidenceHttpAdapter,
    },
    {
      provide: NormativeDocumentGateway,
      useClass: NormativeDocumentHttpAdapter,
    },
    {
      provide: RequiredDocumentGateway,
      useClass: RequiredDocumentHttpAdapter,
    },
  ],
};
