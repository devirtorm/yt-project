import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const requiredRol = route.data['expectedRol'];
      if (requiredRol && this.authService.hasRole(requiredRol)) {
        return true;
      } else {
        Swal.fire({
          icon: "error",
          title: "No autorizado",
          text: "No tienes permisos para acceder a esta sección."
        });
        this.router.navigate(['/']);
        return false;
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Inicia sesión",
        text: "Parece que no tienes acceso, inicia sesión o regístrate para disfrutar de este beneficio"
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}

