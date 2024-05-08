
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {


  API: string = 'http://172.31.1.182:8000/api/suscripciones/';

  constructor(private httpClient:HttpClient) { }

  suscribirse(userData:FormData):Observable<any>{
    return this.httpClient.post(this.API,userData)
  }

  desSuscribirse(id:string):Observable<any>{
    return this.httpClient.delete(this.API+id)
  }

  tendencias():Observable<any>{
    return this.httpClient.get(this.API+'tendencias')
  }

  suscripcionesCount(idCanal:string):Observable<any>{
    return this.httpClient.get(this.API+'count/'+idCanal)
  }

  


  



}
