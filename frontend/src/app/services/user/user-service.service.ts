import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getVideoByUserId(id:string): Observable<any> {
    return this.httpClient.get(this.API+id+'/videos-activos');
  }

  getVideoByUserPk(id:string): Observable<any> {
    return this.httpClient.get(this.API+id+'/videos');
  }
  

  getPlaylistsByUserId(id:string): Observable<any> {
    return this.httpClient.get(this.API+id+'/playlists');  
  }

}
