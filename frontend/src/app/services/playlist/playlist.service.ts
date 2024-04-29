import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  API: string = 'http://127.0.0.1:8000/api/playlists/';
  data: any;

  constructor(private httpClient:HttpClient) { }

  savePlaylistByUserId(playlistData: FormData): Observable<any> {
    return this.httpClient.post(this.API,playlistData)
  }

  getPlaylistVideos(playlistId: string): Observable<any> {
    return this.httpClient.get(this.API+playlistId+'/videos');
  }


}
