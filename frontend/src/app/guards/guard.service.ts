import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Si el usuario está autenticado, permite el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      return false;
    }
  }
}
