import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  API: string = 'http://192.168.1.252:8000/api/reportes/';
  data: any;

  constructor(private httpClient:HttpClient) { }

  obtenerMasVistos(): Observable<any> {
    return this.httpClient.get(this.API+'top-videos');
  }

  obtenerMasLikes(): Observable<any> {
    return this.httpClient.get(this.API+'top-videos-likes');
  }


}