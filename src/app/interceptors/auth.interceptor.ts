import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si recibimos un 403 (Forbidden) o 401 (Unauthorized), el token probablemente está expirado
      if (error.status === 403 || error.status === 401) {
        // Limpiar el token expirado
        authService.logout();
        // Redirigir al login
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

