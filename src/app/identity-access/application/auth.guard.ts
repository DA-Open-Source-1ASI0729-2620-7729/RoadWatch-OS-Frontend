import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';

export const requireAuthenticatedUser: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  return auth.user() ? true : router.createUrlTree(['/auth/login']);
};
