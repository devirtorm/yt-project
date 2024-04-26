import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'http://localhost:8000/api/search'; // Asegúrate de que la URL base sea correcta

  constructor(private http: HttpClient) { }

  // Método para buscar usuarios
  searchUsers(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?query=${query}`);
  }

  // Método para buscar videos
  searchVideos(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/videos?query=${query}`);
  }
}