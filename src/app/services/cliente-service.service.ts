import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  obtenerClientes(): Observable<any> {
    const token = localStorage.getItem('token');
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      console.log(token)

    return this.http.get<any[]>('http://localhost:8080/admin/clientes', { headers });
  }

  obtenerTipoContribuyentes(): Observable<any> {
    const token = localStorage.getItem('token');
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      console.log(token)

    return this.http.get<any[]>('http://localhost:8080/admin/contribuyente', { headers });
  }

  guardarCliente(cliente: any): Observable<any> {
    const token = localStorage.getItem('token');
 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
 
    return this.http.post('http://localhost:8080/admin/clientes', cliente, { headers });
 }
  }
