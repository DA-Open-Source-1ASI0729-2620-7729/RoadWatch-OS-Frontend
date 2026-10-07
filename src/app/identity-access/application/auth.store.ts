import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthApi } from '../infrastructure/auth-api';
import { AuthToken } from '../domain/model/auth-token';
import { DemoProfile } from '../domain/model/demo-profile';
import { User } from '../domain/model/user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly api = inject(AuthApi);

  readonly user = signal<User | null>(null);
  readonly token = signal<AuthToken | null>(null);
  readonly demoProfiles = signal<DemoProfile[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly authenticated = computed(() => !!this.user() && !!this.token());

  loadDemoProfiles(): void {
    this.api.getDemoProfiles().subscribe((profiles) => this.demoProfiles.set(profiles));
  }

  login(email: string, password: string): void {
    this.loading.set(true);
    this.error.set('');
    this.api.login(email, password).subscribe({
      next: (session) => {
        this.user.set(session.user);
        this.token.set(session.token);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Selecciona un perfil válido.');
        this.loading.set(false);
      },
    });
  }

  logout(): void {
    this.user.set(null);
    this.token.set(null);
  }
}
