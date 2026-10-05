import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthGateway } from '../application/auth.gateway';
import { User } from '../domain/model/user';

@Injectable({ providedIn: 'root' })
export class AuthApi extends AuthGateway {
  private readonly user: User = {
    id: 'u-01', name: 'Gisela Chávez', email: 'gchavez@ecoaudit.pe', status: 'ACTIVE',
    role: { type: 'ADMIN', label: 'Administradora', permissions: [
      { code: 'reports.read', label: 'Ver reportes' },
      { code: 'documents.read', label: 'Ver documentos' },
      { code: 'subscription.read', label: 'Ver suscripción' },
      { code: 'subscription.change', label: 'Cambiar plan' },
    ] },
  };

  login(email: string, password: string): Observable<{ user: User; token: { value: string; expiresAt: string } }> {
    return email && password
      ? of({ user: { ...this.user, email }, token: { value: 'mock-token', expiresAt: '2026-12-31T23:59:59Z' } })
      : throwError(() => new Error('Credenciales requeridas'));
  }

  currentUser(): Observable<User | null> { return of(null); }
}
