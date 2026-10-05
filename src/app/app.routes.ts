import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'incidencias',
    loadChildren: () => import('./incident-mitigation/incident-mitigation.routes').then(m => m.INCIDENT_MITIGATION_ROUTES)
  }
];