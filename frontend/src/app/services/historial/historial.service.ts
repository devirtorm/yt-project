import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {


  API: string = 'http://192.168.1.69:8000/api/historial/';

  constructor(private httpClient:HttpClient) { }

  storeVista(userData:FormData):Observable<any>{
    return this.httpClient.post(this.API,userData)
  }

  tendencias():Observable<any>{
    return this.httpClient.get(this.API+'tendencias')
  }




}
