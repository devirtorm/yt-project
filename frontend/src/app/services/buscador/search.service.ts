import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  public search(query: string): Observable<any> {
    const apiUrl = 'http://localhost:8000/api/search/all'; // Asegúrate de que la URL es correcta
    return this.http.get(apiUrl, { params: { query: query } });
  }
}