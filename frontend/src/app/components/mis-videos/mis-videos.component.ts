import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-videos',
  templateUrl: './mis-videos.component.html',
  styleUrls: ['./mis-videos.component.css'],
})
export class MisVideosComponent implements OnInit {
  formVideo!: FormGroup;
  showModal: boolean = false;
  showEditModal: boolean = false;

  videoSeleccionado: any = {}; //los campos para editar
  editVideo!: FormGroup;

  videos: any = {};
  videosOriginales: any = {};

  constructor(
    private formulario: FormBuilder,
    private videoService: VideosService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.editVideo = this.formulario.group({
      titulo: [''],
      descripcion: [''],
      url: [''],
      miniatura: ['']
    });

    // Inicializar el formulario con los controles necesarios
    this.formVideo = this.formulario.group({
      titulo: [''],
      descripcion: [''],
      url: [''],
      miniatura: [''],
    });

    this.cargarVideos();
  }

  saveVideo(): void {
    console.log(this.formVideo.value);
    if (this.formVideo.valid) {
      const id = localStorage.getItem('id');

      // Crear una instancia de FormData
      const formData = new FormData();

      // Agregar los valores de los campos al FormData
      formData.append('titulo', this.formVideo.get('titulo')?.value || '');
      formData.append(
        'descripcion',
        this.formVideo.get('descripcion')?.value || ''
      );
      formData.append(
        'miniatura',
        this.formVideo.get('miniatura')?.value || ''
      );
      formData.append('url', this.formVideo.get('url')?.value || '');
      formData.append('estado', '1'); // Si el estado es constante, se puede agregar aquí
      formData.append('fk_categoria', '1');
      if (id) {
        formData.append('fk_user', id); // Agregar el id del usuario
      }

      // Enviar el FormData al servicio
      this.videoService.storeVideo(formData).subscribe(
        () => {
          // Manejar la respuesta o redireccionar si es necesario
          console.log('Video guardado exitosamente');
          this.formVideo.reset(); // Limpiar el formulario si es necesario

          // Cerrar el modal solo si la respuesta es exitosa
          this.toggleModal(); // Cerrar el modal después de agregar el registro

          // Actualizar la lista de videos después de guardar exitosamente
          this.cargarVideos();
        },
        (error) => {
          console.error('Error al guardar el video:', error);
        }
      );
    }
  }

  cargarVideos(): void {
    this.videoService.getVideos().subscribe((respuesta) => {
      console.log(respuesta);
      this.videos = respuesta;
      this.videosOriginales = { ...respuesta };
    });
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  }

  onFileSelected(event: any, controlName: string): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.formVideo.get(controlName)?.setValue(file);
    }
  }

  borrarRegistro(id: any, iControl: any) {
    if (window.confirm('¿Estás seguro que deseas eliminar este video?')) {
      this.videoService.BorrarVideo(id).subscribe(() => {
        // Eliminar el video de la lista localmente
        this.videos.data.splice(iControl, 1);
      });
    }
  }

  editData(): void {
    if (this.editVideo.valid) {
      const id = this.videoSeleccionado.id;
      const formData = new FormData();
      
      formData.append('titulo', this.editVideo.get('titulo')?.value || '');
      formData.append('descripcion', this.editVideo.get('descripcion')?.value || '');
      formData.append('estado', '1');
      formData.append('fk_categoria', '1');
      formData.append('_method', 'PUT');

      
      const fk_usuario = localStorage.getItem('id');
      if (fk_usuario) {
        formData.append('fk_user', fk_usuario);
      }
      
      formData.append(
        'miniatura',
        this.formVideo.get('miniatura')?.value || ''
      );
      formData.append('url', this.formVideo.get('url')?.value || '');
  
      // Imprimir los valores de FormData antes de enviar
      console.log('Valores del FormData que se enviarán:');
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
  
      // Envío de datos
      this.videoService.ActualizarVideo(id, formData).subscribe(
        () => {
          console.log('Video actualizado exitosamente');
          this.toggleEditModal();  // Cerrar el modal después de editar
          this.cargarVideos();  // Recargar la lista de videos si es necesario

        },
        error => {
          console.error('Error al actualizar el video:', error);
        }
      );
    } else {
      console.error('El formulario no es válido');
    }
  }
  
  
  
  

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  toggleEditModal(video?: any): void {
    this.showEditModal = !this.showEditModal;
    if (video) {
        this.editVideo.patchValue({
            titulo: video.titulo,
            descripcion: video.descripcion,
            // Asegúrate de añadir todos los campos necesarios aquí
        });
        this.videoSeleccionado = { ...video };
    } else {
        this.videoSeleccionado = {};
    }
}

  
}