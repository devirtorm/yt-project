import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../auth/categoria-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  API: string = 'http://127.0.0.1:8000/api/categoria/';

  constructor(private httpClient:HttpClient) { }

  storeCategoria(categoriaData:Categoria):Observable<any>{
    return this.httpClient.post(this.API,categoriaData)
  }

  BorrarCategoria(id:any):Observable<any>{
    return this.httpClient.delete(this.API+id)
  }

  getCategorias(): Observable<any> {
    return this.httpClient.get(this.API);
  }

}
