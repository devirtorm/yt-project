import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from '../../services/videos/videos.service';
import { ComentariosService } from '../../services/videos/comentarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LikesService } from '../../services/videos/likes.service';
import { HistorialService } from '../../services/historial/historial.service';
import { AuthService } from '../../services/auth/auth.service';
import Hashids from 'hashids';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

interface Comment {
  id: string;
  user: {
    name: string; 
  };
  created_at: string;
  comentario: string;
  fk_user: string;
  fk_video: string;
}

@Component({
  selector: 'app-video-detalle',
  templateUrl: './video-detalle.component.html',
  styleUrl: './video-detalle.component.css',
})
export class VideoDetalleComponent implements OnInit {
  video: any; // Variable para almacenar los datos del video
  like: any = {};
  comments: { comentarios: Comment[] } = { comentarios: [] };
  respuestaPorComentario: { [commentId: string]: any[] } = {};
  respuestas: any = {};
  formComentario: FormGroup;
  formRespuesta: FormGroup;
  dropdownOpenIndex: number = -1;
  dropdownOpenReplies: number = -1;
  videoHasLike: boolean = false;
  userId: string | null = localStorage.getItem('userId');
  isLiked: boolean = false;
  nuevoComentario: string = ''; // Variable para almacenar el nuevo comentario
  mostrandoInputComentario: boolean = false; // Variable para controlar la visibilidad del campo de entrada
  comentarioAResponderId: number | null = null;
  comentarioSeleccionado: { id: number | null, respuesta: string } = { id: null, respuesta: '' }; // Cambio en el tipo de dato del ID
  private hashids = new Hashids('kX7#5@8Uw!9Rq2Tz', 12);
  isLogged: boolean = false

  constructor(
    private authService: AuthService,
    public form: FormBuilder,
    private route: ActivatedRoute,
    private likesService: LikesService,
    private videoService: VideosService,
    private historialService: HistorialService,
    private comentariosService: ComentariosService
  ) {
    

    const formValues = {
      comentario: [''],
    };

    const formValuesRespuesta = {
      respuesta: [''],
    };

    this.formComentario = this.form.group(formValues);

    this.formRespuesta = this.form.group(formValuesRespuesta);

    this.isLogged = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.cargarInfo();

    setTimeout(() => {
      this.saveReproduccion();
    }, 15000);
    
  }

  saveReproduccion(): void {
    const idUser = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('fk_video', this.video.data.id);
    if (idUser) {
      formData.append('fk_user', idUser);
    }

    console.log(formData);
    this.historialService.storeVista(formData).subscribe(
      (response) => {
        console.log("Reproduccion registrada");
      },
      (error) => {
        // Maneja el error si ocurre
        console.error('Error al registrar la reproduccion:', error);
      }
    );
  }

  

  decodeId(encodedId: string): number | null {
    const decodedArray = this.hashids.decode(encodedId);
    if (decodedArray.length === 0) {
      return null;  // No hay ID válido para retornar
    }
    const firstElement = decodedArray[0];
    // Comprobación de tipo para convertir bigint a number si es necesario
    if (typeof firstElement === 'bigint') {
      return Number(firstElement);  // Convertir bigint a number
    }
    return firstElement as number;  // Asumiendo que el valor ya es de tipo number
  }
  


  cargarInfo(): void {
    const encodedId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID codificado del video de los parámetros de la ruta
    if (encodedId !== null) {
      const id = this.decodeId(encodedId); // Decodifica el ID
      if (id !== null) {
        this.videoService.getVideoById(Number(id)).subscribe((data: any) => {
          this.video = data; // Almacena los datos del video recuperado del servicio
          console.log(this.video); // Imprime los datos del video en la consola
          this.cargarComentarios();
          this.infoLike();
        });
      } else {
        console.error('ID decodificado inválido'); // Manejo de error si la decodificación falla
      }
    } else {
      console.error('No se encontró ID codificado en la URL'); // Manejo de error si no hay ID en la URL
    }
  }
  

  toggleInput(commentId: number) {
    if (this.comentarioSeleccionado.id !== null && this.comentarioSeleccionado.id === Number(commentId)) {
      this.comentarioSeleccionado.id = null;
    } else {
      this.comentarioSeleccionado = { id: commentId, respuesta: '' };
    }
  }

  infoLike(): void {
    if (this.userId !== null) {
      this.likesService
        .getLikeByUserAndVideo(this.userId, this.video.data.id)
        .subscribe(
          (data: any) => {
            this.like = data;
            console.log(this.like);
            // Actualiza isLiked basado en si hay un "me gusta" o no
            this.isLiked = this.like !== null;
          },
          (error) => {
            console.error('Error al cargar comentarios:', error);
            // En caso de error, establece isLiked en false
            this.isLiked = false;
          }
        );
    }
  }
  

  cargarComentarios(): void {
    console.log(this.video.data.id);
    this.videoService.getCommentsByVideoId(this.video.data.id).subscribe(
      (data: { comentarios: Comment[] }) => { // Aquí estás tipando los datos recibidos como un arreglo de comentarios
        this.comments = data;
        this.comments.comentarios.forEach(comment => {
          this.cargarRespuestas(this.video.data.id, comment.id);
        });
        console.log(this.comments);
      },
      (error) => {
        console.error('Error al cargar comentarios:', error);
      }
    );
  }

  cargarRespuestas(videoId:string, commentId: string): void {
    console.log(commentId); // Solo para verificar el commentId
    console.log("joto"); // Solo para verificar el commentId
    this.comentariosService.getReplyByCommentId(commentId).subscribe(
      (data: any) => {
        console.log(data);
        this.respuestaPorComentario[commentId] = data;
      },
      (error) => {
        console.error('Error al cargar respuestas:', error);
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

  saveRespuesta(comment:string): void {
    const idUser = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('respuesta', this.formRespuesta.value.respuesta);
    formData.append('fk_comentario', comment);
    if (idUser) {
      formData.append('fk_user', idUser);
    }

    console.log(formData);
    this.comentariosService.saveReplyByCommentId(formData).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Respuesta guardada',
          showConfirmButton: false,
          timer: 1500,
          backdrop: false,
        });

        this.cargarComentarios();
        this.formRespuesta.reset();
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

  toggleDropdownReplies(iControl: number) {
    if (this.dropdownOpenReplies === iControl) {
      this.dropdownOpenReplies = -1; // Cierra el dropdown si ya está abierto
      console.log(iControl);
    } else {
      this.dropdownOpenReplies = iControl; // Abre el dropdown correspondiente
      console.log(iControl);
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

  async editarComentario(id: string, comentario: string, idVideo: string) {
    const ipAPI = '//api.ipify.org?format=json';
    const response = await fetch(ipAPI);
    const data = await response.json();
    const inputValue = comentario;
    const { value: valorComentario } = await Swal.fire({
      title: 'Edita tu comentario',
      input: 'text',
      cancelButtonText: 'Cancelar ',
      confirmButtonText: 'Aceptar',
      inputValue,
      showCancelButton: true,
    });
    if (valorComentario) {
      const formData = new FormData();
      formData.append('comentario', valorComentario);
      formData.append('_method', 'patch');

      this.comentariosService.EditarComentario(id, formData).subscribe(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
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
  saveLike(): void {
    const idUser = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('fk_video', this.video.data.id);
    formData.append('like', '1');
    if (idUser) {
      formData.append('fk_usuario', idUser);
    }
  
    console.log(formData);
    this.likesService.saveLikeByVideoId(formData).subscribe(
      (response) => {
        console.log(response);
        this.videoHasLike = !this.videoHasLike;
        this.infoLike(); // Actualiza la información de "me gusta"
      },
      (error) => {
        // Maneja el error si ocurre
        console.error('Error al guardar el comentario:', error);
      }
    );
  }

/*   saveDislike(): void {
    const idUser = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('fk_video', this.video.data.id);
    formData.append('like', '0'); // Indica que es un "no me gusta"
    if (idUser) {
      formData.append('fk_usuario', idUser);
    }
  
    console.log(formData);
  
    // Primero, elimina cualquier "me gusta" existente
    if (this.isLiked) {
      this.likesService.deleteLikeByUserAndVideo(this.userId, this.video.data.id).subscribe(
        () => {
          console.log('Me gusta eliminado correctamente');
          this.isLiked = false; // Actualiza el estado de "me gusta"
          // Luego, guarda el "no me gusta"
          this.saveDislikeRequest(formData);
        },
        (error) => {
          console.error('Error al eliminar el me gusta:', error);
        }
      );
    } else {
      // Si no hay "me gusta" existente, solo guarda el "no me gusta"
      this.saveDislikeRequest(formData);
    }
  } */
  
  private saveDislikeRequest(formData: FormData): void {
    this.likesService.saveLikeByVideoId(formData).subscribe(
      (response) => {
        console.log(response);
        this.videoHasLike = !this.videoHasLike;
        this.infoLike(); // Actualiza la información de "me gusta"
      },
      (error) => {
        // Maneja el error si ocurre
        console.error('Error al guardar el "no me gusta":', error);
      }
    );
  }
  
  
}
