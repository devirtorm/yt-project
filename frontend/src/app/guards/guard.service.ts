import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Si el usuario está autenticado, permite el acceso a la ruta
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Inicia sesión",
        text:"Parece que no tienes acceso, inicia sesión o regístrate para disfrutar de este beneficio",
        showConfirmButton: false,
        timer: 3000,
      });
      this.router.navigate(['/sign-up']); // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      return false;
    }
  }
}
