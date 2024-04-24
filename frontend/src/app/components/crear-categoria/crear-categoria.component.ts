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
  // Declaración de propiedades del componente
  editCategoria: FormGroup; // Formulario de edición de categorías
  categorias: any = {}; // Almacena las categorías
  categoriasOriginales: any = {}; // Almacena una copia de las categorías originales
  categoriaSeleccionada: any = {}; // Almacena la categoría seleccionada
  showModal: boolean = false; // Controla la visibilidad del modal
  terminoBusqueda: string = ''; // Término de búsqueda de categorías

  // Constructor del componente
  constructor(
    private categoriaService: CategoriaService, // Servicio para operaciones de categorías
    public form: FormBuilder, // Instancia de FormBuilder para construir formularios
    private actualizacionTablaService: ModalTablaCategoriasService // Servicio para actualizar la tabla de categorías
  ) {
    // Inicialización del formulario de edición de categorías
    const formValues = {
      nombre_categoria: [''], // Campo para el nombre de la categoría
      descripcion: [''], // Campo para la descripción de la categoría
    }
    this.editCategoria = this.form.group(formValues);
  }

  // Método ejecutado al inicializar el componente
  ngOnInit(): void {
    // Suscripción al observable de actualización de la tabla
    this.actualizacionTablaService.actualizarTabla$.subscribe(() => {
      this.cargarCategorias(); // Cargar las categorías al recibir una actualización
    });
    this.cargarCategorias(); // Cargar las categorías al inicializar el componente
  }

  // Método para alternar la visibilidad del modal de edición de categorías
  toggleModal(categoria?: any): void {
    this.showModal = !this.showModal; // Alternar visibilidad del modal
    if (categoria) {
      this.categoriaSeleccionada = { ...categoria }; // Asignar categoría seleccionada si se proporciona
    } else {
      this.categoriaSeleccionada = {}; // Limpiar la categoría seleccionada
    }
  }

  // Método para editar los datos de una categoría
  editData(): void {
    if (this.editCategoria.valid) { // Verificar la validez del formulario
      const id = this.categoriaSeleccionada.id; // Obtener el ID de la categoría seleccionada
      const formData = this.editCategoria.value; // Obtener los datos del formulario
      this.categoriaService.updateCategoria(id, formData).subscribe(() => {
        this.actualizacionTablaService.actualizarTabla(); // Actualizar la tabla después de editar
        this.toggleModal(); // Cerrar el modal después de editar
      });
    }
  }

  // Método para cargar las categorías
  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe((respuesta) => {
      console.log(respuesta);
      this.categorias = respuesta; // Asignar las categorías obtenidas
      this.categoriasOriginales = { ...respuesta }; // Crear una copia de las categorías originales
    });
  }

  // Método para borrar una categoría
  borrarRegistro(id: any, iControl: any) {
    if (window.confirm('¿Estás seguro que deseas eliminar este empleado?')) {
      this.categoriaService.BorrarCategoria(id).subscribe((respuesta) => {
        this.categorias.data.splice(iControl, 1); // Eliminar la categoría del arreglo de categorías
      });
    }
  }

  // Método para buscar categorías por nombre
  buscarCategoria(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim().toLowerCase(); // Obtener el término de búsqueda
    if (valor === '') {
      this.categorias = { ...this.categoriasOriginales }; // Restaurar las categorías originales si el término de búsqueda está vacío
      return;
    }
    // Filtrar las categorías por nombre
    this.categorias.data = this.categoriasOriginales.data.filter((categoria: any) => {
      return categoria.nombre_categoria.toLowerCase().includes(valor);
    });
  }

  // Método para limpiar el término de búsqueda
  limpiarBusqueda(): void {
    this.terminoBusqueda = ''; // Limpiar el término de búsqueda
    this.cargarCategorias(); // Recargar todas las categorías
  }

}
