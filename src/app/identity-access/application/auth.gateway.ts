import { Observable } from 'rxjs';
import { AuthToken } from '../domain/model/auth-token';
import { DemoProfile } from '../domain/model/demo-profile';
import { User } from '../domain/model/user';

export abstract class AuthGateway {
  abstract login(email: string, password: string): Observable<{ user: User; token: AuthToken }>;
  abstract currentUser(): Observable<User | null>;
  abstract getDemoProfiles(): Observable<DemoProfile[]>;
}
