import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://192.168.1.78:8000/api/login';

  constructor(private httpClient: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.httpClient.post(this.API, loginData).pipe(
      map((response: any) => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('rol', response.rol); // Asumiendo que la API envía un 'rol'
        }
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
    const token = localStorage.getItem('token');
    console.log("isLoggedIn checked, token:", token); // Verificar qué se obtiene aquí
    return token !== null && token !== '';
  }
  
  hasRole(requiredRol: string): boolean {
    const rol = localStorage.getItem('rol');
    console.log("Checking role, required:", requiredRol, "current:", rol); // Verificar los roles
    return rol === requiredRol;
  }
}