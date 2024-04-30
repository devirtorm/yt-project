import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {


  API: string = 'http://127.0.0.1:8000/api/historial/';

  constructor(private httpClient:HttpClient) { }

  storeVista(userData:FormData):Observable<any>{
    return this.httpClient.post(this.API,userData)
  }




}
