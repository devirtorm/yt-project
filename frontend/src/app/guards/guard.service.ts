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
        this.router.navigate(['/access-denied']);
        return false;
      }
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
  
}

