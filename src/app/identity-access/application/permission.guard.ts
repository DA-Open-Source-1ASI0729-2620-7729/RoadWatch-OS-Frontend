import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';

export const requirePermission =
  (permission: string): CanActivateFn =>
  () => {
    const auth = inject(AuthStore);
    const router = inject(Router);
    const user = auth.user();

    if (!user) return router.createUrlTree(['/auth/login']);
    if (user.role?.permissions.some((item) => item.code === permission)) return true;

    return router.createUrlTree([user.role?.type === 'AUDITOR' ? '/reports' : '/projects']);
  };
