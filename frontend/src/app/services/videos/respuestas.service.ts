import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from './comentarioInterface';
@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  API: string = 'http://192.168.1.252:8000/api/respuestas/';
  data: any;

  constructor(private httpClient: HttpClient) { }

  editReply(id:string, formData:FormData): Observable<any> {
    return this.httpClient.post(this.API+id, formData);
  }

  deleteReply(id:any):Observable<any>{
    return this.httpClient.delete(this.API+id)
  }

  EditarComentario(id:any, comentario:FormData):Observable<any>{
    return this.httpClient.post(this.API+id,comentario)
  }

  
}
