import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistVideoService {
  API: string = 'http://127.0.0.1:8000/api/playlist_videos/';
  data: any;

  constructor(private httpClient:HttpClient) { }

  savePlaylistVideo(playlistData: FormData): Observable<any> {
    return this.httpClient.post(this.API,playlistData)
  }
}
