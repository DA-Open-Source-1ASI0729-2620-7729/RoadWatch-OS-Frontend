import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthGateway } from '../application/auth.gateway';
import { AuthToken } from '../domain/model/auth-token';
import { Role } from '../domain/model/role';
import { RoleType } from '../domain/model/role-type';
import { User } from '../domain/model/user';

interface AuthenticationResponse {
  token: string;
  expiresAt: string;
}

interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: User['status'];
  roles: RoleType[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthHttpAdapter extends AuthGateway {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://roadwatch-os-backend-production.up.railway.app/api/v1';

  login(email: string, password: string): Observable<{ user: User; token: AuthToken }> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        switchMap((authentication) =>
          this.http
            .get<UserResponse>(`${this.apiUrl}/users`, { params: new HttpParams().set('email', email) })
            .pipe(
              map((user) => ({
                user: this.toUser(user),
                token: { value: authentication.token, expiresAt: authentication.expiresAt },
              })),
            ),
        ),
      );
  }

  currentUser(): Observable<User | null> {
    return of(null);
  }

  private toUser(response: UserResponse): User {
    const role = response.roles[0];

    return {
      id: String(response.id),
      firstName: response.firstName,
      lastName: response.lastName,
      name: `${response.firstName} ${response.lastName}`.trim(),
      email: response.email,
      status: response.status,
      role: role ? this.toRole(role) : null,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }

  private toRole(type: RoleType): Role {
    return {
      type,
      label: this.roleLabel(type),
      permissions: [],
    };
  }

  private roleLabel(type: RoleType): string {
    return {
      ADMIN: 'Administrador',
      MANAGER: 'Gestor',
      ENVIRONMENTAL_OFFICER: 'Responsable ambiental',
      AUDITOR: 'Auditor',
    }[type];
  }
}
