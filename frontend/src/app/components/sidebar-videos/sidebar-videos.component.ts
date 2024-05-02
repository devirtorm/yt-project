import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user-service.service';
import { Router } from '@angular/router';
import { SearchService } from '../../services/buscador/search.service'; // Asegúrate de que la ruta sea correcta
import Swal from 'sweetalert2';



@Component({
  selector: 'app-sidebar-videos',
  templateUrl: './sidebar-videos.component.html',
  styleUrls: ['./sidebar-videos.component.css']
})
export class SidebarVideosComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  user: any = {};
  searchResults: any = null; 
  rol : number = 0;


  constructor (
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private searchService: SearchService
  ) {}
  ngOnInit(): void {
    this.cargarUsuario();
    this.rol = Number(localStorage.getItem('rol'));
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
      this.router.navigateByUrl('/sign-up');
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


  search(): void {
    const query = this.searchInput.nativeElement.value;
    console.log('Búsqueda con query:', query); // Para depurar
    if (!query.trim()) return;
    this.searchService.search(query).subscribe({
      next: (response) => {
        console.log('Resultados de la búsqueda:', response); // Para depurar
        this.searchResults = response;
      },
      error: (error) => {
        console.error('Error durante la búsqueda:', error);
      }
    });
  }
  

}
