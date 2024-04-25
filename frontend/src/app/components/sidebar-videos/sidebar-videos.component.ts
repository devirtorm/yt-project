import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-sidebar-videos',
  templateUrl: './sidebar-videos.component.html',
  styleUrl: './sidebar-videos.component.css'
})
export class SidebarVideosComponent {

  user: any = {};


  constructor (
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    this.cargarUsuario();
  }

  logout(): void {
    this.authService.logout(); // Llama al método logout del servicio AuthService
    Swal.fire({ // Muestra el SweetAlert
      position: 'top-end',
      icon: 'success',
      title: 'Hasta pronto',
      showConfirmButton: false,
      timer: 1500
    }).then(() => { // Después de cerrar el SweetAlert, redirige al usuario a la página de inicio
      this.router.navigateByUrl('/');
    });
  }
  
  cargarUsuario(): void {
    const id = localStorage.getItem('userId');
    if (id !== null) {
      this.userService.getUser(id).subscribe(
        (respuesta) => {
          console.log(respuesta);
          this.user = respuesta;
        },
        (error) => {
          console.error('Error al cargar usuario:', error);
        }
      );
    } else {
      console.error('El valor de userId en localStorage es null');
    }
  }
  

}
