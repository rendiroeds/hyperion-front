import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {  }

  obtenerUsuarios(): Observable<any> {
    const token = localStorage.getItem('token');
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      console.log(token)

    return this.http.get<any[]>('http://localhost:8080/admin/usuarios', { headers });
  }

  guardarUsuario(usuario: any): Observable<any> {
    const token = localStorage.getItem('token');
 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
 
    return this.http.post('http://localhost:8080/admin/usuario', usuario, { headers });
 }
}
