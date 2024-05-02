import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API: string = 'http://192.168.1.252:8000/api/users/';

  constructor(private httpClient:HttpClient) { }

  storeUser(userData:User):Observable<any>{
    return this.httpClient.post(this.API,userData)
  }

  listaCanaleSuscritos(idCanal:string):Observable<any>{
    return this.httpClient.get(this.API+idCanal+'/suscripciones')
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

  
  estadoSuscripcion(user_fk:string,suscriptor_fk:string): Observable<any> {
    return this.httpClient.get(this.API+user_fk+'/suscriptor/'+suscriptor_fk);  
  }
  
}
