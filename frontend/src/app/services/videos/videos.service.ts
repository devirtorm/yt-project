import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  constructor(private http: HttpClient) {}

  storeVideo(formData: FormData) {
    return this.http.post('http://127.0.0.1:8000/api/videos/', formData);
  }
}