import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categorias/categorias.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalTablaCategoriasService } from '../../services/categorias/modal-tabla-categorias.service'; 

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css'],
})
export class CrearCategoriaComponent implements OnInit {
  categorias: any = {};
  categoriasOriginales: any = {};

  terminoBusqueda: string = '';

  constructor(
    private categoriaService: CategoriaService,
    public form:FormBuilder,
    private actualizacionTablaService: ModalTablaCategoriasService // Importante
  ) {}

  ngOnInit(): void {
    this.actualizacionTablaService.actualizarTabla$.subscribe(() => {
      this.cargarCategorias();
    });
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe((respuesta) => {
      console.log(respuesta);
      this.categorias = respuesta;
      this.categoriasOriginales = { ...respuesta }; // Hacer una copia de respaldo
    });
  }

  borrarRegistro(id: any, iControl: any) {
    console.log(id);
    console.log(iControl);

    if (window.confirm('¿Estas seguro que deseas eliminar este empleado?')) {
      this.categoriaService.BorrarCategoria(id).subscribe((respuesta) => {
        this.categorias.data.splice(iControl, 1);
      });
    }
  }

  buscarCategoria(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (valor === '') {
      this.categorias = { ...this.categoriasOriginales }; // Restaurar categorías originales
      return;
    }
    this.categorias.data = this.categoriasOriginales.data.filter((categoria: any) => {
      return categoria.nombre_categoria.toLowerCase().includes(valor);
    });
  }

  limpiarBusqueda(): void {
    // Restablecer la lista de categorías original
    this.terminoBusqueda = '';
    this.cargarCategorias();
  }
}
