import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerifyPinService {
  private API = 'http://172.31.2.74:8000/api/verify-pin';

  constructor(private httpClient: HttpClient) {}

  verifyPin(pin: any): Observable<any> {
    return this.httpClient.post(this.API,{pin:pin})
  }

}