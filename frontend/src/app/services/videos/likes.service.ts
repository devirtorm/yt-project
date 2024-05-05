import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from './comentarioInterface';
@Injectable({
  providedIn: 'root'
})
export class LikesService {
  API: string = 'http://192.168.1.252:8000/api/likes/';
  data: any;

  constructor(private httpClient: HttpClient) { }

  
  getLikeByUserAndVideo(userId: string, videoId: string): Observable<any> {
    return this.httpClient.post(this.API + 'search', { fk_usuario: userId, fk_video: videoId });
  }

  saveLikeByVideoId(likeData: FormData): Observable<any> {
    return this.httpClient.post(this.API,likeData)
  }

  saveDisikeByVideoId(fk_video: any, fk_usuario:any): Observable<any> {
    return this.httpClient.post(this.API+'dislike',{like: false, fk_video: fk_video, fk_usuario: fk_usuario})
  }

  deleteLikeByUserAndVideo(userId: string, videoId: string): Observable<any> {
    const url = `${this.API}delete`; // Cambia '/delete' por la ruta correcta de tu API
    const params = { fk_usuario: userId, fk_video: videoId };
    return this.httpClient.delete(url, { params });
  }

  
}
