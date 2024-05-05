import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { UserService } from '../../services/user/user-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-mis-videos',
  templateUrl: './mis-videos.component.html',
  styleUrls: ['./mis-videos.component.css'],
})
export class MisVideosComponent implements OnInit {
  formVideo!: FormGroup;
  showModal: boolean = false;
  showEditModal: boolean = false;
  rol : number = 0;

  videoSeleccionado: any = {}; //los campos para editar
  editVideo!: FormGroup;

  videos: any = {};
  videosOriginales: any = {};
  



  constructor(
    private formulario: FormBuilder,
    private videoService: VideosService,
    private userService: UserService,
    private progress: NgProgress,
    private router: Router
  ) {
    const formValues = {
      titulo: ['', [Validators.required]], 
      descripcion: ['', [Validators.required]],
      miniatura: ['', Validators.required], 
      url: ['', [Validators.required]],  
    };

    const formValuesEditar = {
      titulo: ['', [Validators.required]], 
      descripcion: ['', [Validators.required]],
      miniatura: ['', Validators.required], 
      url: ['', [Validators.required]],
    };

    this.formVideo = this.formulario.group(formValues);
    this.editVideo = this.formulario.group(formValuesEditar);
  }
  

  ngOnInit(): void {
    this.rol = Number(localStorage.getItem('rol'));

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
    const progressRef = this.progress.ref();
    console.log(this.formVideo.value);
    if (this.formVideo.valid) {
  
      const id = localStorage.getItem('userId');
      const formData = new FormData();
      formData.append('titulo', this.formVideo.get('titulo')?.value || '');
      formData.append('descripcion', this.formVideo.get('descripcion')?.value || '');
      formData.append('miniatura', this.formVideo.get('miniatura')?.value || '');
      formData.append('url', this.formVideo.get('url')?.value || '');
      formData.append('estado', '1');
      formData.append('fk_categoria', '1');
      if (id) {
        formData.append('fk_user', id);
      }
      progressRef.start();
      this.videoService.storeVideo(formData).subscribe(
        () => {
          this.formVideo.reset();
          this.toggleModal();
          this.cargarVideos();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tu video se ha subido correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          progressRef.complete();
        },
        (error) => {
          console.error('Error al guardar el video:', error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No hemos podido guardar tu video",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        
      );
    }
  }
  

  cargarVideos(): void {

    const userId = localStorage.getItem('userId'); 
    if(userId){
      this.userService.getVideoByUserPk(userId).subscribe((respuesta) => {
        console.log(respuesta); 
        this.videos = respuesta;
        this.videosOriginales = { ...respuesta };
      });
    }

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
    Swal.fire({
      title: "Estas seguro",
      text: "No podras recuperar el video",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Borrado!",
          text: "Video eliminado exitosamente",
          icon: "success",
          confirmButtonText:"Aceptar"
        });
          this.videoService.BorrarVideo(id).subscribe(() => {
            // Eliminar el video de la lista localmente
            this.videos.data.splice(iControl, 1);
          });
      }
    });

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

      
      const fk_usuario = localStorage.getItem('userId');
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

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Video editado exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error => {
          console.error('Error al actualizar el video:', error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error tu video no pudo ser editado",
            showConfirmButton: false,
            timer: 1500,
          });
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