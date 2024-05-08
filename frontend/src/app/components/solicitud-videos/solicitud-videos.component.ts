import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'



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
  incidencias: any = {};

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
    this.videoService.obtenerVideosNull().subscribe((respuesta) => {
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
  

  rechazar(id: string, fk_user: number): void {
    const datosActualizar = {
      revisado: "1",
      estado: "0"
    };
  
    Swal.fire({
      title: "Motivo de rechazo",
      text: "Haga saber al usuario por qué el video no es apto",
      icon: "warning",
      input: "text",
      inputPlaceholder: "Ingrese el motivo de rechazo",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Rechazar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debe proporcionar un motivo para rechazar el video.";
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const motivo = result.value;
  
        // Guarda la incidencia
        const incidenciaData = {
          motivo: motivo,
          fk_user: fk_user,
          fk_video: id
        };
  
        this.videoService.storeIncidencia(incidenciaData).subscribe(
          (response) => {
            Swal.fire({
              title: "Video rechazado!",
              text: response.msg,
              icon: "success",
              confirmButtonText: "Aceptar"
            });
  
            // Actualiza el estado del video
            this.videoService.VerificarVideo(id, datosActualizar).subscribe(
              () => {
                this.cargarVideos();  // Recargar la lista de videos si es necesario
              },
              (error) => {
                console.error('Error al actualizar el video:', error);
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Hubo algun error al procesar la petición",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            );
          },
          (error) => {
            console.error('Error al guardar la incidencia:', error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Hubo un error al guardar la incidencia",
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }
    });
  }

  showIncidenciaModal(videoId: string): void {
    // Suponiendo que tienes una forma de obtener el userId, quizás del servicio de autenticación o una propiedad
    const userId = 'algún_user_id'; // Asegúrate de reemplazar esto con la lógica adecuada para obtener el userId actual
  
    this.videoService.getIncidenciasPorVideoYUsuario(userId, videoId).subscribe({
      next: (incidencia) => {
        Swal.fire({
          title: 'Motivo de Rechazo',
          text: incidencia.motivo, // Asegúrate que esto coincida con cómo se reciben los datos
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
      },
      error: (error) => {
        console.error('Error al obtener la incidencia', error);
        Swal.fire('Error', 'No se pudo cargar el motivo de rechazo.', 'error');
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
