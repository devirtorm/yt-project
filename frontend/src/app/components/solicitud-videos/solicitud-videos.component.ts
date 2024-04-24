import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-solicitud-videos',
  templateUrl: './solicitud-videos.component.html',
  styleUrl: './solicitud-videos.component.css'
})
export class SolicitudVideosComponent implements OnInit {

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



  
  
  

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  aceptar(id:string): void {
    const datosActualizar = {
      revisado: "1",
      estado: "1"
    };
    this.videoService.VerificarVideo(id, datosActualizar).subscribe(
      
      () => {
        console.log('Video actualizado exitosamente');
        this.toggleEditModal();  // Cerrar el modal después de editar
        this.cargarVideos();  // Recargar la lista de videos si es necesario
      },
      error => {
        console.error('Error al actualizar el video:', error);
      }
    );
  }
  

  rechazar(id:string): void {
    const datosActualizar = {
      revisado: "1",
      estado: "0"
    };

    this.videoService.VerificarVideo(id, datosActualizar).subscribe(
      () => {
        console.log('Video actualizado exitosamente');
        this.toggleEditModal();  // Cerrar el modal después de editar
        this.cargarVideos();  // Recargar la lista de videos si es necesario
      },
      error => {
        console.error('Error al actualizar el video:', error);
      }
    );
  
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
