import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://127.0.0.1:8000/api/login';

  constructor(private httpClient: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.httpClient.post(this.API, loginData);
    if (loginData && loginData.token) {
      // Si la respuesta contiene un token, lo devolvemos
      return loginData.token;
    } 
  }
  
  logout(): void {
    localStorage.removeItem('token');
  }
}
