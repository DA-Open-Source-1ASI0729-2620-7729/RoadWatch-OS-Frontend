import { Observable } from 'rxjs';
import { Plan } from '../domain/model/plan';
import { Subscription } from '../domain/model/subscription';
export abstract class SubscriptionGateway {
  abstract plans(): Observable<Plan[]>;
  abstract current(): Observable<Subscription | null>;
  abstract change(planId: Plan['id']): Observable<Subscription | null>;
}
