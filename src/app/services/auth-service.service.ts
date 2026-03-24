import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/login`, { username, password });
  }

  // Método para obtener el token de sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Método para obtener el token de localStorage
  getTokenFromLocalStorage(): string | null {
    return typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
  }

  // Método para verificar si el token está expirado
  isTokenExpired(): boolean {
    const token = this.getTokenFromLocalStorage();
    if (!token) {
      return true;
    }
    try {
      return this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      return true;
    }
  }

  // Método para verificar si el usuario está autenticado (token existe y no está expirado)
  isAuthenticated(): boolean {
    const token = this.getTokenFromLocalStorage();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired();
  }

  // Método para limpiar el token (logout)
  logout(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
      window.sessionStorage.removeItem('token');
    }
  }

  public isAuthenticatedWithRoles(allowRoles: string[]): boolean {
    return this.isAuthenticated();
  }

}
