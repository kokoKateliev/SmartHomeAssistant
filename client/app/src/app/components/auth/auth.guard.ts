import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { filter, map, take } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const routeData = route.data;
  const notAuthenticatedRequired = !!routeData['notAuthenticatedRequired'];
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedIn$.pipe(
    filter((val) => val !== undefined),
    map((user) => {
      return notAuthenticatedRequired
        ? !user || router.parseUrl('/dashboard')
        : !!user || router.parseUrl('/login');
    }),
    take(1)
  );
};