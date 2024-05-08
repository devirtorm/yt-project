import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private API = 'http://192.168.1.252:8000/api/forgot-password';

  constructor(private httpClient: HttpClient) {}

  forgotPassword(email: any): Observable<any> {
    console.log(email);
    return this.httpClient.post(this.API,{email:email})
  }

}