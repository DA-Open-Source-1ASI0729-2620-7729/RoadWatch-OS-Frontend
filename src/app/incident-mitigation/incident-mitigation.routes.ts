import { Routes } from '@angular/router';
import { IncidentGateway } from './domain/gateways/incident.gateway';
import { IncidentMockAdapter } from './infrastructure/incident-mock.adapter';
import { IncidentStore } from './application/incident.store';

export const INCIDENT_MITIGATION_ROUTES: Routes = [
  {
    path: '',
    providers: [
      // Aquí indicamos que use el Mock Adapter cada vez que se pida el Gateway
      { provide: IncidentGateway, useClass: IncidentMockAdapter },
      IncidentStore,
    ],
    children: [
      {
        path: 'kanban',
        loadComponent: () => import('./presentation/views/incident-kanban.component').then(m => m.IncidentKanbanComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./presentation/views/incident-list.component').then(m => m.IncidentListComponent)
      },
      {
        path: ':id', // Ej: /incidencias/INC-0142
        loadComponent: () => import('./presentation/views/incident-detail.component').then(m => m.IncidentDetailComponent)
      },
      {
        path: '',
        redirectTo: 'kanban',
        pathMatch: 'full'
      }
    ]
  }
];
