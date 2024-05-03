import { Component, Input, OnInit, input } from '@angular/core';
import { UserService } from '../../services/user/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from '../../services/videos/videos.service';
import { SuscripcionService } from '../../services/suscripcion/suscripcion.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistVideoService } from '../../services/playlist/playlist-video.service';
import Hashids from 'hashids';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit  {

  videos: any; // Variable para almacenar los datos del video
  user:any;
  estaSuscrito!: boolean;
  idSuscripcion: any;
  showListModal: boolean = false;
  showListModalCreatePlaylist: boolean = false;
  selectedVideoId!: string;
  contador: any;
  playlists: any = {};
  dropdownOpenIndex: number = -1;

  formPlaylist: FormGroup;

  private hashids = new Hashids('kX7#5@8Uw!9Rq2Tz', 12);


  constructor(
    private playlistService: PlaylistService,
    private playlistVideoService: PlaylistVideoService,
    private userService: UserService,
    private videosService: VideosService,
    private suscripcionService: SuscripcionService,
    private route: ActivatedRoute,
    public form: FormBuilder,
  ){
    const formValuesPlaylist = {
      nombre_lista: [''],
      descripcion: [''],
    };

    this.formPlaylist = this.form.group(formValuesPlaylist);
  }

  ngOnInit(): void {
    this.cargarInfo();
    

  }


  getVideoLink(videoId: number): string {
    const encodedId = this.hashids.encode(videoId);
    return `/video/${encodedId}`;
  }

  buscarRelacion(idCanal:string): void {
    // Realizar la petición HTTP para buscar la relación entre usuario y suscriptor
    const userId = localStorage.getItem('userId');

    if (!idCanal || !userId) {
      console.error('No se puede suscribir: ID de usuario o ID de video no válidos.');
      return;
    }

    this.userService.estadoSuscripcion(userId, idCanal).subscribe(
      (data: any) => {
        // Manejo de la respuesta exitosa
        console.log("122");
        console.log(data.data.id);
        console.log(data);

        this.estaSuscrito = data.data.esta_suscrito;
        this.idSuscripcion = data.data.id;
        
      },
      (error: any) => {
        // Manejo de errores
        console.error('Error al suscribirse:', error);
        // Puedes agregar aquí lógica para manejar el error, como mostrar un mensaje al usuario o redirigirlo a otra página
      }
    );
  }


  suscribirse(idCanal:string): void {
    const userId = localStorage.getItem('userId');
  
    if (!idCanal || !userId) {
      console.error('No se puede suscribir: ID de usuario o ID de video no válidos.');
      return;
    }
  
    const formData = new FormData();
    formData.append('user_fk', userId);
    formData.append('suscriptor_fk', idCanal);
  
    this.suscripcionService.suscribirse(formData).subscribe(
      (datos: any) => {
        // Manejo de la respuesta exitosa
        console.log("123");
        console.log(datos);
        this.buscarRelacion(this.user.data.id);

      },
      (error: any) => {
        // Manejo de errores
        console.error('Error al suscribirse:', error);
        // Puedes agregar aquí lógica para manejar el error, como mostrar un mensaje al usuario o redirigirlo a otra página
        this.desuscribirse(this.idSuscripcion);
      }
    );
  }

  contarSuscripciones(idCanal: string): void {
    this.suscripcionService.suscripcionesCount(idCanal).subscribe(
      (data: any) => {
        // Manejo de la respuesta exitosa
        console.log(data);

        this.contador = data.cantidad_suscriptores;
        this.estaSuscrito = false;
        this.buscarRelacion(idCanal);
      },
      (error: any) => {
        // Manejo de errores
        console.error('Error al suscribirse:', error);
        // Puedes agregar aquí lógica para manejar el error, como mostrar un mensaje al usuario o redirigirlo a otra página
      }
    );
  }

  desuscribirse(idCanal:string): void {
    // Realizar la petición HTTP para buscar la relación entre usuario y suscriptor
    const userId = localStorage.getItem('userId');

    if (!idCanal || !userId) {
      console.error('No se puede suscribir: ID de usuario o ID de video no válidos.');
      return;
    }

    this.suscripcionService.desSuscribirse(idCanal).subscribe(
      (data: any) => {
        // Manejo de la respuesta exitosa
        console.log(data);

        this.estaSuscrito = false;
        this.buscarRelacion(idCanal);
      },
      (error: any) => {
        // Manejo de errores
        console.error('Error al suscribirse:', error);
        // Puedes agregar aquí lógica para manejar el error, como mostrar un mensaje al usuario o redirigirlo a otra página
      }
    );
  }

  


  cargarInfo(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID del video de los parámetros de la ruta
    if (id !== null) {
      // Verifica que id no sea null
      this.userService.getUser(id).subscribe(
        (data: any) => {
          // Manejo de la respuesta exitosa
          this.user = data; // Almacena los datos del usuario recuperados del servicio
          console.log(this.user); // Imprime los datos del usuario en la consola
          this.cargarVideos();
          this.buscarRelacion(this.user.data.id);
          this.contarSuscripciones(this.user.data.id);
        },
        (error: any) => {
          // Manejo de errores
          console.error('Error al cargar la información del usuario:', error);
          // Puedes agregar aquí lógica para manejar el error, como mostrar un mensaje al usuario o redirigirlo a otra página
        }
      );
    } else {
      // Manejo de error o redirección si id es null
    }
  }



  cargarVideos(): void {
    console.log(this.user.data.id);
    this.userService.getVideoByUserId(this.user.data.id).subscribe(
      (data: any) => { // Aquí estás tipando los datos recibidos como un arreglo de comentarios
        this.videos = data;
        console.log(this.videos);
      },
      (error) => {
        console.error('Error al cargar comentarios:', error);
      }
    );
  }

  
  cargarPlaylists(): void {
    const idUser = localStorage.getItem('userId');
    if (idUser) {
      this.userService.getPlaylistsByUserId(idUser).subscribe((respuesta) => {
        console.log(respuesta);
        console.log('videos');
        this.playlists = respuesta;

        // Obtener videos asociados a cada lista de reproducción
        this.playlists.data.forEach((playlist: any) => {
          this.playlistService
            .getPlaylistVideos(playlist.id)
            .subscribe((videos: any) => {
              playlist.videos = videos; // Agregar la lista de videos a la lista de reproducción
            });
        });
      });
    }
  }

  saveVideoOnlist(playlistId: string): void {
    console.log(this.selectedVideoId);
    const formData = new FormData();
    formData.append('fk_video', this.selectedVideoId);
    formData.append('fk_playlist', playlistId);

    this.playlistVideoService.savePlaylistVideo(formData).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Video agregado a playlist',
          showConfirmButton: false,
          timer: 1500,
          backdrop: false,
        });
        this.cargarPlaylists();
        this.formPlaylist.reset();
      },
      (error) => {
        // Maneja el error si ocurre
        console.error('Error al guardar el comentario:', error);
      }
    );
  }

  saveData(): void {
    const idUser = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('nombre_lista', this.formPlaylist.value.nombre_lista);
    formData.append('descripcion', this.formPlaylist.value.descripcion);
    formData.append('estado', '1');
    if (idUser) {
      formData.append('fk_usuario', idUser);
    }

    console.log(formData);
    this.playlistService.savePlaylistByUserId(formData).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Playlist creada',
          showConfirmButton: false,
          timer: 1500,
          backdrop: false,
        });
        this.cargarPlaylists();
        this.saveVideoOnlist(response.playlist.id);
        this.toggleModal();
      },
      (error) => {
        // Maneja el error si ocurre
        console.error('Error al guardar playlist:', error);
      }
    );
  }

  isVideoInPlaylist(playlist: any, videoId: string): boolean {
    if (playlist && playlist.videos) {
      return playlist.videos.some((video: any) => video.id === videoId);
    }
    return false;
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

  toggleModal() {
    this.showListModal = !this.showListModal;
  }

  saveVideoId(videoId: string) {
    this.selectedVideoId = videoId;
  }

  toggleModalCreatePlaylist() {
    this.showListModalCreatePlaylist = !this.showListModalCreatePlaylist;
  }
  
}
