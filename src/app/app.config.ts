import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { ProjectManagementGateway } from './project-management/application/project-management.gateway';
import { ProjectManagementMockAdapter } from './project-management/infrastructure/project-management.mock.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: ProjectManagementGateway,
      useClass: ProjectManagementMockAdapter,
    },
  ],
};
