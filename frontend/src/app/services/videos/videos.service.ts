import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  API: string = 'http://127.0.0.1:8000/api/videos/';

  constructor(private httpClient: HttpClient) { }

  storeVideo(videoData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    // Configura el encabezado Content-Type como multipart/form-data
    headers.append('Content-Type', 'multipart/form-data');

    // Realiza la solicitud POST con los datos y los encabezados adecuados
    return this.httpClient.post(this.API, videoData, { headers: headers });
  }
}
