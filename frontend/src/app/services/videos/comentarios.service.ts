import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from './comentarioInterface';
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  API: string = 'http://127.0.0.1:8000/api/comentarios/';
  data: any;

  constructor(private httpClient: HttpClient) { }

  saveCommentByVideoId(commentData: FormData): Observable<any> {
    return this.httpClient.post(this.API,commentData)
  }

  BorrarComentario(id:any):Observable<any>{
    return this.httpClient.delete(this.API+id)
  }

  EditarComentario(id:any, comentario:FormData):Observable<any>{
    return this.httpClient.post(this.API+id,comentario)
  }
}
