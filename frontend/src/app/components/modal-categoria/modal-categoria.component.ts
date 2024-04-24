import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaService } from '../../services/categorias/categorias.service';
import { Router } from '@angular/router';
import { ModalTablaCategoriasService } from '../../services/categorias/modal-tabla-categorias.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrl: './modal-categoria.component.css',
})
export class ModalCategoriaComponent {
  modalAbierto: boolean = true; // Variable para controlar el estado del modal
  agregarCategoria: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    public form: FormBuilder,
    public router: Router,
    private actualizacionTablaService: ModalTablaCategoriasService // Importante
  ) {
    const formValues = {
      nombre_categoria: [''],
      descripcion: [''],
    };
    this.agregarCategoria = this.form.group(formValues);
  }

  saveData(): any {
    console.log(this.agregarCategoria.value);
    this.categoriaService
      .storeCategoria(this.agregarCategoria.value)
      .subscribe(() => {
        this.actualizacionTablaService.actualizarTabla(); // Notificar al componente padre
        this.modalAbierto = false;
        this.resetForm();
      });
  }

  resetForm(): void {
    this.agregarCategoria.reset(); // Resetear los valores del formulario
  }
}
