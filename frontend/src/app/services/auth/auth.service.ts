import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://127.0.0.1:8000/api/login';

  constructor(private httpClient: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.httpClient.post(this.API, loginData)
      .pipe(
        map((response: any) => {
          // Si la respuesta contiene un token, lo almacenamos en el localStorage
          if (response && response.access_token) {
            localStorage.setItem('token', response.access_token);
          }
          // Devolvemos la respuesta completa
          return response;
        })
      );
  }
   
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('rol');
  }

  isLoggedIn(): boolean {
    // Comprueba si el token de acceso está presente en el localStorage
    const token = localStorage.getItem('token');
    // Devuelve true si el token está presente y no está vacío
    return token !== null && token !== '';
  }
}
