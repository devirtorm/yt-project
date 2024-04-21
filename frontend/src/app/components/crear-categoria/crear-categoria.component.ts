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
  editCategoria: FormGroup;
  categorias: any = {};
  categoriasOriginales: any = {};
  categoriaSeleccionada: any = {};
  showModal: boolean = false;
  terminoBusqueda: string = '';

  constructor(
    private categoriaService: CategoriaService,
    public form: FormBuilder,
    private actualizacionTablaService: ModalTablaCategoriasService
  ) {
    const formValues = {
      nombre_categoria: [''],
      descripcion: [''],
    }
    this.editCategoria = this.form.group(formValues);

  }
  



  ngOnInit(): void {
    this.actualizacionTablaService.actualizarTabla$.subscribe(() => {
      this.cargarCategorias();
    });
    this.cargarCategorias();
  }



  toggleModal(categoria?: any): void {
    this.showModal = !this.showModal;
    if (categoria) {
      this.categoriaSeleccionada = { ...categoria };
    } else {
      this.categoriaSeleccionada = {};
    }
  }

  editData(): void {
    if (this.editCategoria.valid) {
      const id = this.categoriaSeleccionada.id;
      const formData = this.editCategoria.value;
      this.categoriaService.updateCategoria(id, formData).subscribe(() => {
        this.actualizacionTablaService.actualizarTabla();
        this.toggleModal(); // Cerrar el modal después de editar
      });
    }
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe((respuesta) => {
      this.categorias = respuesta;
      this.categoriasOriginales = { ...respuesta };
    });
  }

  borrarRegistro(id: any, iControl: any) {
    if (window.confirm('¿Estás seguro que deseas eliminar este empleado?')) {
      this.categoriaService.BorrarCategoria(id).subscribe((respuesta) => {
        this.categorias.data.splice(iControl, 1);
      });
    }
  }

  buscarCategoria(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (valor === '') {
      this.categorias = { ...this.categoriasOriginales };
      return;
    }
    this.categorias.data = this.categoriasOriginales.data.filter((categoria: any) => {
      return categoria.nombre_categoria.toLowerCase().includes(valor);
    });
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.cargarCategorias();
  }

}