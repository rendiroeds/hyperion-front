import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
      // Limpiar token expirado
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}