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

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/login`, { username, password });
  }

  // Método para obtener el token de sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public isAuthenticated(allowRoles: string[]): boolean {
    const token: any = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    return true;
  }

}
