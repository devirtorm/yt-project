import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistVideoService {
  API: string = 'http://192.168.1.252:8000/api/playlist_videos/';
  data: any;

  constructor(private httpClient:HttpClient) { }

  savePlaylistVideo(playlistData: FormData): Observable<any> {
    return this.httpClient.post(this.API,playlistData)
  }
}
