import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from '../../services/videos/videos.service';
import { ComentariosService } from '../../services/videos/comentarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-video-detalle',
  templateUrl: './video-detalle.component.html',
  styleUrl: './video-detalle.component.css',
})
export class VideoDetalleComponent implements OnInit {
  video: any; // Variable para almacenar los datos del video
  comments: any = {};
  formComentario: FormGroup;
  dropdownOpenIndex: number = -1;
  userId: string | null = localStorage.getItem('userId');

  constructor(
    public form: FormBuilder,
    private route: ActivatedRoute,
    private videoService: VideosService,
    private comentariosService: ComentariosService
  ) {
    const formValues = {
      comentario: [''],
    };
    this.formComentario = this.form.group(formValues);
  }

  ngOnInit(): void {
    this.cargarInfo();
  }

  cargarInfo(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID del video de los parámetros de la ruta
    if (id !== null) {
      // Verifica que id no sea null
      this.videoService.getVideoById(id).subscribe((data: any) => {
        this.video = data; // Almacena los datos del video recuperado del servicio
        console.log(this.video); // Imprime los datos del video en la consola
        this.cargarComentarios();
      });
    } else {
      // Manejo de error o redirección si id es null
    }
  }

  cargarComentarios(): void {
    console.log(this.video.data.id); //
    this.videoService.getCommentsByVideoId(this.video.data.id).subscribe(
      (data: any) => {
        // Imprime los comentarios del video en la consola
        // Asigna los comentarios a una variable en tu componente para mostrarlos en la plantilla
        this.comments = data;
        console.log(this.comments);
      },
      (error) => {
        console.error('Error al cargar comentarios:', error);
        // Aquí puedes manejar el error de la forma que desees, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  saveData(): void {
    const idUser = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('comentario', this.formComentario.value.comentario);
    formData.append('fk_video', this.video.data.id);
    if (idUser) {
      formData.append('fk_user', idUser);
    }

    console.log(formData);
    this.comentariosService.saveCommentByVideoId(formData).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Tu comentario se ha publicado',
          showConfirmButton: false,
          timer: 1500,
          backdrop: false,
        });

        this.cargarComentarios();
        this.formComentario.reset();
        this.dropdownOpenIndex = -1;
      },
      (error) => {
        // Maneja el error si ocurre
        console.error('Error al guardar el comentario:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? 'hace 1 año' : `hace ${years} años`;
    } else if (months > 0) {
      return months === 1 ? 'hace 1 mes' : `hace ${months} meses`;
    } else if (days > 0) {
      return days === 1 ? 'hace 1 día' : `hace ${days} días`;
    } else if (hours > 0) {
      return hours === 1 ? 'hace 1 hora' : `hace ${hours} horas`;
    } else if (minutes > 0) {
      return minutes === 1 ? 'hace 1 minuto' : `hace ${minutes} minutos`;
    } else {
      return seconds === 1 ? 'hace 1 segundo' : `hace ${seconds} segundos`;
    }
  }

  toggleDropdown(index: number) {
    if (this.dropdownOpenIndex === index) {
      this.dropdownOpenIndex = -1; // Cierra el dropdown si ya está abierto
      console.log(index);
    } else {
      this.dropdownOpenIndex = index; // Abre el dropdown correspondiente
      console.log(index);
    }
  }

  borrarComentario(id: string, index: any) {
    Swal.fire({
      title: 'Estas seguro',
      text: 'Tu comentario se eliminara permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Tu comentario se ha eliminado',
          showConfirmButton: false,
          timer: 1500,
          backdrop: false,
        });
        this.comentariosService.BorrarComentario(id).subscribe((respuesta) => {
          this.comments.comentarios.splice(index, 1); // Eliminar la categoría del arreglo de categorías
        });
      }
    });
  }

  async editarComentario(id: string, comentario:string, idVideo:string) {
    const ipAPI = '//api.ipify.org?format=json';
    const response = await fetch(ipAPI);
    const data = await response.json();
    const inputValue = comentario;
    const { value: valorComentario } = await Swal.fire({
      title: 'Edita tu comentario',
      input: 'text',
      cancelButtonText:'Cancelar ',
      confirmButtonText:'Aceptar',
      inputValue,
      showCancelButton: true,
    });
    if (valorComentario) {
      const formData = new FormData();
      formData.append('comentario', valorComentario);
      formData.append('_method','patch');

      this.comentariosService.EditarComentario(id, formData).subscribe(() => {
        Swal.fire({
          position: 'top-end',
          icon:'success',
          text: 'Tu comentario se ha editado',
          showConfirmButton: false,
          timer: 1500,
          backdrop: false,
        });
        this.cargarComentarios();
        this.dropdownOpenIndex = -1;
      });
    }
  }
}
