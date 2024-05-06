import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  API: string = 'http://192.168.1.252:8000/api/videos/';
  data: any;

  constructor(private httpClient: HttpClient) { }

  ActualizarVideo(id:string, formData:FormData): Observable<any> {
    return this.httpClient.post(this.API+id,formData);
    
  }

  VerificarVideo(id:string, valores:any): Observable<any> {
    return this.httpClient.patch(this.API+id,valores);
    
  }

  storeVideo(videoData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    // Configura el encabezado Content-Type como multipart/form-data
    headers.append('Content-Type', 'multipart/form-data');

    // Realiza la solicitud POST con los datos y los encabezados adecuados
    return this.httpClient.post(this.API, videoData, { headers: headers });
  }

  getVideoById(id:number): Observable<any> {
    return this.httpClient.get(this.API+id);
  }



  getCommentsByVideoId(id:string): Observable<any> {
    return this.httpClient.get(this.API+id+'/comentarios-video');
  }

/*   getCommentsByVideoId(id:string): Observable<any> {
    return this.httpClient.get(this.API+id+'/comentarios');
  } */

  getVideos(): Observable<any> {
    return this.httpClient.get(this.API);
  }

  obtenerVideosVerificados(): Observable<any> {
    return this.httpClient.get(this.API+"active/");
  }

  obtenerVideosRechazados(): Observable<any> {
    return this.httpClient.get(this.API+"rechazados/");
  }

  obtenerVideosNull(): Observable<any> {
    return this.httpClient.get(this.API+"inactive/");
  }
  
  

  BorrarVideo(id:string): Observable<any> {
    return this.httpClient.delete(this.API+id);
  }
  

}
