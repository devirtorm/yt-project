import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SearchService } from '../../services/buscador/search.service'; // Asegúrate de que la ruta sea correcta
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  searchResults: any = null; 
  rol : number = 0;

  constructor( private authService: AuthService, private router:Router, private searchService: SearchService){}
  @ViewChild('searchInput') searchInput!: ElementRef;

  layout = {
    profileOpen: false,
    asideOpen: false
  };
  
  ngOnInit(): void {
    this.rol = Number(localStorage.getItem('rol'));
  }

  toggleProfile() {
    this.layout.profileOpen = !this.layout.profileOpen;
  }

  toggleAside() {
    this.layout.asideOpen = !this.layout.asideOpen;
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
      location.href='/'
    });
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
// app.component.ts




