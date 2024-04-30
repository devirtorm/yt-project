import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-videos-rechazados',
  templateUrl: './videos-rechazados.component.html',
  styleUrl: './videos-rechazados.component.css'
})
export class VideosRechazadosComponent {
  @Output() recargarVideos: EventEmitter<void> = new EventEmitter<void>();

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
    this.videoService.obtenerVideosRechazados().subscribe((respuesta) => {
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
    Swal.fire({
      title: "Estas seguro?",
      text: "El video se publicara",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Publicar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Video aceptado!",
          icon: "success",
          confirmButtonText:"Aceptar"
        });
        this.videoService.VerificarVideo(id, datosActualizar).subscribe(
          () => {
            this.toggleEditModal();  // Cerrar el modal después de editar
            this.cargarVideos();  // Recargar la lista de videos si es necesario
            location.reload();
          },
          error => {
            console.error('Error al actualizar el video:', error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Hubo algun error al procesar la petición",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }
  

  rechazar(id:string): void {
    const datosActualizar = {
      revisado: "1",
      estado: "0"
    };

    Swal.fire({
      title: "Estas seguro?",
      text: "El video sera rechazado y no podrá ser mostrado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rechazar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Video rechazado!",
          icon: "success",
          confirmButtonText:"Rechazar"
        });
        this.videoService.VerificarVideo(id, datosActualizar).subscribe(
          () => {
            this.toggleEditModal();  // Cerrar el modal después de editar
            this.cargarVideos();  // Recargar la lista de videos si es necesario
            location.reload();
          },
          error => {
            console.error('Error al actualizar el video:', error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Hubo algun error al procesar la petición",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });

  
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




