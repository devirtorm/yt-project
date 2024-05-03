import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API: string = 'http://127.0.0.1:8000/api/users/';

  constructor(private httpClient:HttpClient) { }

  storeUser(userData:User):Observable<any>{
    return this.httpClient.post(this.API,userData)
  }

  getUser(id:string):Observable<any>{
    return this.httpClient.get(this.API+id)
  }

  updateUser(userId: string, formData: FormData): Observable<any> {
    return this.httpClient.post(this.API+userId,formData)
  }

  getVideoByUserId(id:string): Observable<any> {
    return this.httpClient.get(this.API+id+'/videos-activos');
  }

  getVideoByUserPk(id:string): Observable<any> {
    return this.httpClient.get(this.API+id+'/videos');
  }

  getPlaylistsByUserId(id:string): Observable<any> {
    return this.httpClient.get(this.API+id+'/playlists');  
  }

  getHistoryByUserId(id:string): Observable<any> {
    return this.httpClient.get(this.API+id+'/historial');  
  }

  getUsers(): Observable<any> {
    // Obtener el token de autenticación del localStorage
    const token = localStorage.getItem('token');
    
    // Crear HttpHeaders, incluyendo el token si existe
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Usa 'Authorization' con 'Bearer'
    });

    // Realizar la solicitud GET incluyendo los headers
    return this.httpClient.get(`${this.API}`, { headers: headers });
  }

  // Método para obtener usuarios inactivos
  getUsersInactive(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get(this.API, { headers });
  }

}
