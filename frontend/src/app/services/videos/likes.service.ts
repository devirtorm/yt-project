import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from './comentarioInterface';
@Injectable({
  providedIn: 'root'
})
export class LikesService {
  API: string = 'http://127.0.0.1:8000/api/likes/';
  data: any;

  constructor(private httpClient: HttpClient) { }

  
  getLikeByUserAndVideo(userId: string, videoId: string): Observable<any> {
    return this.httpClient.post(this.API + 'search', { fk_usuario: userId, fk_video: videoId });
  }

  saveLikeByVideoId(likeData: FormData): Observable<any> {
    return this.httpClient.post(this.API,likeData)
  }

  deleteLikeByUserAndVideo(userId: string, videoId: string): Observable<any> {
    const url = `${this.API}delete`; // Cambia '/delete' por la ruta correcta de tu API
    const params = { fk_usuario: userId, fk_video: videoId };
    return this.httpClient.delete(url, { params });
  }

  
}
