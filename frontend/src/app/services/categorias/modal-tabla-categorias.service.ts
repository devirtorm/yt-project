import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalTablaCategoriasService {

  private actualizarTablaSubject = new Subject<void>();

  actualizarTabla$ = this.actualizarTablaSubject.asObservable();

  actualizarTabla() {
    this.actualizarTablaSubject.next();
  }
  
}


