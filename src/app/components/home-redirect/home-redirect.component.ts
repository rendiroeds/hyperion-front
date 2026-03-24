import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-home-redirect',
  standalone: true,
  imports: [CommonModule],
  template: '<div></div>',
})
export class HomeRedirectComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verificar si el token existe y no está expirado
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (isAuthenticated) {
      // Si hay token válido, redirigir al dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // Si no hay token o está expirado, limpiar y redirigir al login
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}

