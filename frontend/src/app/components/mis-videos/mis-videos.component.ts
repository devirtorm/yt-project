import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-videos',
  templateUrl: './mis-videos.component.html',
  styleUrls: ['./mis-videos.component.css']
})
export class MisVideosComponent implements OnInit {
  formVideo!: FormGroup;
  showModal: boolean = false;

  constructor(
    private formulario: FormBuilder,
    private videoService: VideosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario con los controles necesarios
    this.formVideo = this.formulario.group({
      titulo: [''],
      descripcion: [''],
      url: [''],
      miniatura: ['']
    });
  }

  saveVideo(): void {
    console.log(this.formVideo.value);
    if (this.formVideo.valid) {
      const id = localStorage.getItem('id');
      
      // Crear una instancia de FormData
      const formData = new FormData();

      // Agregar los valores de los campos al FormData
      formData.append('titulo', this.formVideo.get('titulo')?.value || '');
      formData.append('descripcion', this.formVideo.get('descripcion')?.value || '');
      formData.append('miniatura', this.formVideo.get('miniatura')?.value || '');
      formData.append('url', this.formVideo.get('url')?.value || '');
      formData.append('estado', '1'); // Si el estado es constante, se puede agregar aquí
      formData.append('fk_categoria', '1');
      if (id) {
        formData.append('fk_user', id); // Agregar el id del usuario
      }

      // Enviar el FormData al servicio
      this.videoService.storeVideo(formData).subscribe(() => {
        // Manejar la respuesta o redireccionar si es necesario
        this.showModal = false;
      });
    }
  }

  onFileSelected(event: any, controlName: string): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.formVideo.get(controlName)?.setValue(file);
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
