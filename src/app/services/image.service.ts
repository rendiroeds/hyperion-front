import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
  
    this.http.post<{ text: string }>('http://localhost:8080/images/process', formData)
      .subscribe(response => {
        console.log('Texto detectado:', response.text);
      });
  }

  uploadPdf(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    const token = localStorage.getItem('token'); // Obtener el token guardado
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
      Accept: 'text/plain' // Indica que el backend devuelve un .txt
    });
  
    return this.http.post('http://localhost:8080/images/procesar', formData, {
      responseType: 'blob', // Recibir el archivo como Blob
      headers: headers
    });
  }
}
