import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthGateway } from '../application/auth.gateway';
import { DemoProfile } from '../domain/model/demo-profile';
import { User } from '../domain/model/user';

@Injectable({ providedIn: 'root' })
export class AuthApi extends AuthGateway {
  private readonly profiles: Array<DemoProfile & { user: User }> = [
    {
      id: 'e-admin', code: 'E-Administrador', label: 'Administrador de constructora',
      segment: 'CONSTRUCTION_COMPANY', email: 'admin.constructora@roadwatch.demo', password: 'roadwatch', role: 'ADMIN',
      user: {
        id: 'u-e-01', name: 'Carlos Mendoza', email: 'admin.constructora@roadwatch.demo', status: 'ACTIVE', organizationSegment: 'CONSTRUCTION_COMPANY',
        role: { type: 'ADMIN', label: 'Administrador', permissions: [
          { code: 'projects.read', label: 'Ver proyectos' },
          { code: 'subscription.read', label: 'Ver suscripción' },
          { code: 'subscription.change', label: 'Cambiar plan' },
        ] },
      },
    },
    {
      id: 'e-manager', code: 'E-Gestor de proyecto', label: 'Gestor de proyecto',
      segment: 'CONSTRUCTION_COMPANY', email: 'gestor.constructora@roadwatch.demo', password: 'roadwatch', role: 'MANAGER',
      user: {
        id: 'u-e-02', name: 'María Torres', email: 'gestor.constructora@roadwatch.demo', status: 'ACTIVE', organizationSegment: 'CONSTRUCTION_COMPANY',
        role: { type: 'MANAGER', label: 'Gestora de proyecto', permissions: [
          { code: 'projects.read', label: 'Ver proyectos' },
          { code: 'subscription.read', label: 'Ver suscripción' },
        ] },
      },
    },
    {
      id: 'e-environmental', code: 'E-Responsable ambiental', label: 'Responsable ambiental',
      segment: 'CONSTRUCTION_COMPANY', email: 'ambiental.constructora@roadwatch.demo', password: 'roadwatch', role: 'ENVIRONMENTAL_OFFICER',
      user: {
        id: 'u-e-03', name: 'Rosa Vargas', email: 'ambiental.constructora@roadwatch.demo', status: 'ACTIVE', organizationSegment: 'CONSTRUCTION_COMPANY',
        role: { type: 'ENVIRONMENTAL_OFFICER', label: 'Responsable ambiental', permissions: [
          { code: 'monitoring.read', label: 'Ver monitoreo' },
          { code: 'monitoring.write', label: 'Registrar mediciones' },
        ] },
      },
    },
    {
      id: 'sc-admin', code: 'SC-Administrador', label: 'Administrador de consultora',
      segment: 'SUPERVISORY_CONSULTANCY', email: 'admin.consultora@roadwatch.demo', password: 'roadwatch', role: 'ADMIN',
      user: {
        id: 'u-sc-01', name: 'Gisela Chávez', email: 'admin.consultora@roadwatch.demo', status: 'ACTIVE', organizationSegment: 'SUPERVISORY_CONSULTANCY',
        role: { type: 'ADMIN', label: 'Administradora', permissions: [
          { code: 'reports.read', label: 'Ver reportes' },
          { code: 'subscription.read', label: 'Ver suscripción' },
          { code: 'subscription.change', label: 'Cambiar plan' },
        ] },
      },
    },
    {
      id: 'sc-auditor', code: 'SC-Auditor ambiental', label: 'Auditor ambiental',
      segment: 'SUPERVISORY_CONSULTANCY', email: 'auditor.consultora@roadwatch.demo', password: 'roadwatch', role: 'AUDITOR',
      user: {
        id: 'u-sc-02', name: 'Luis Herrera', email: 'auditor.consultora@roadwatch.demo', status: 'ACTIVE', organizationSegment: 'SUPERVISORY_CONSULTANCY',
        role: { type: 'AUDITOR', label: 'Auditor ambiental', permissions: [
          { code: 'reports.read', label: 'Ver reportes' },
          { code: 'documents.read', label: 'Ver documentos' },
        ] },
      },
    },
  ];

  login(email: string, password: string): Observable<{ user: User; token: { value: string; expiresAt: string } }> {
    const profile = this.profiles.find(item => item.email === email && item.password === password);
    return profile
      ? of({ user: profile.user, token: { value: `mock-token-${profile.id}`, expiresAt: '2026-12-31T23:59:59Z' } })
      : throwError(() => new Error('Credenciales de demostración inválidas'));
  }

  currentUser(): Observable<User | null> { return of(null); }

  getDemoProfiles(): Observable<DemoProfile[]> {
    return of(this.profiles.map(({ user, ...profile }) => profile));
  }
}
