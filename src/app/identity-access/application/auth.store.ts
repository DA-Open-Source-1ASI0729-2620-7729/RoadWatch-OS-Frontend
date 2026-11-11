import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, map, of } from 'rxjs';
import { AuthGateway } from './auth.gateway';
import { AuthToken } from '../domain/model/auth-token';
import { User } from '../domain/model/user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly gateway = inject(AuthGateway);

  readonly user = signal<User | null>(null);
  readonly token = signal<AuthToken | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly authenticated = computed(() => !!this.user() && !!this.token());

  login(email: string, password: string): Observable<User | null> {
    this.loading.set(true);
    this.error.set('');
    return this.gateway.login(email, password).pipe(
      map((session) => {
        this.user.set(session.user);
        this.token.set(session.token);
        return session.user;
      }),
      catchError(() => {
        this.error.set('Correo o contraseña inválidos.');
        return of(null);
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  logout(): void {
    this.user.set(null);
    this.token.set(null);
  }
}
