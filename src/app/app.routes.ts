import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'project-management/portafolio-lista',
    loadComponent: () =>
      import('./project-management/presentation/views/portafolio-lista/portafolio-lista').then(
        (m) => m.PortafolioLista,
      ),
  },
  {
    path: 'project-management/portafolio-tarjetas',
    loadComponent: () =>
      import('./project-management/presentation/views/portafolio-tarjetas/portafolio-tarjetas').then(
        (m) => m.PortafolioTarjetas,
      ),
  },
  {
    path: 'project-management/puntos-monitoreo',
    loadComponent: () =>
      import('./project-management/presentation/views/puntos-monitoreo/puntos-monitoreo').then(
        (m) => m.PuntosMonitoreo,
      ),
  },
  { path: '', redirectTo: 'project-management/portafolio-lista', pathMatch: 'full' },
  { path: '**', redirectTo: 'project-management/portafolio-lista' },
];
