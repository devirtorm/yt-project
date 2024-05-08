import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SearchService } from '../../services/buscador/search.service'; // Asegúrate de que la ruta sea correcta
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  query: string = '';
  results: any[] = [];
  isLoading: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  rol : any
  searchResults: any = null; 

  constructor( private authService: AuthService, private router:Router, private searchService: SearchService){}

  layout = {
    profileOpen: false,
    asideOpen: false
  };
  
  ngOnInit(): void {
    this.rol = Number(localStorage.getItem('rol'));
  }
  search(): void {
    const query = this.searchInput.nativeElement.value;
    if (!query.trim()) return;

    this.router.navigate(['/search-results'], { queryParams: { query } });
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



  onSearch(): void {
    if (this.query.trim()) {
      this.isLoading = true;
      this.searchService.search(this.query).subscribe({
        next: (data) => {
          this.results = data.results; // Ajustar según estructura de tu API
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error en la búsqueda:', err);
          this.isLoading = false;
        }
      });
    }
  }


}
// app.component.ts
