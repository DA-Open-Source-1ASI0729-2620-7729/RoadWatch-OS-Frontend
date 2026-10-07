import { Routes } from '@angular/router';
const login = () => import('./presentation/views/login/login').then((m) => m.Login);
export const identityAccessRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadComponent: login, title: 'Iniciar sesión | RoadWatch OS' },
];
