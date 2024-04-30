import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarUsuariosService {
  private apiUrl = 'http://127.0.0.1:8000/api/users'; // Ajusta esta URL a tu entorno de desarrollo

  constructor(private http: HttpClient) {}

  // Método para obtener los detalles del usuario
  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Método para actualizar el usuario
  updateUser(userId: string, formData: FormData): Observable<any> {
    // En Laravel, para enviar datos que incluyan archivos, a menudo se usa POST con un campo _method 'PUT'
    formData.append('_method', 'PUT');
    return this.http.post(`${this.apiUrl}/${userId}`, formData);
  }
}