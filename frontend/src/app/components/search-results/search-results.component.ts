// src/app/search-results/search-results.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/buscador/search.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Hashids from 'hashids';
import { VideosService } from '../../services/videos/videos.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistVideoService } from '../../services/playlist/playlist-video.service';
import { SuscripcionService } from '../../services/suscripcion/suscripcion.service';
import { UserService } from '../../services/user/user-service.service';
import { NgProgress } from 'ngx-progressbar';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  query: string = '';
  searchResults: any = null;
  isLoading: boolean = false;

  estaSuscrito!: boolean;
  idSuscripcion: any;
  user:any;
  contador: any;



  videos: any = {};
  playlists: any = {};
  dropdownOpenIndex: number = -1;
  showListModal: boolean = false;
  showListModalCreatePlaylist: boolean = false;
  selectedVideoId!: string;
  private hashids = new Hashids('kX7#5@8Uw!9Rq2Tz', 12);
  formPlaylist!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private videoService: VideosService,
    private playlistService: PlaylistService,
    private suscripcionService: SuscripcionService,
    private playlistVideoService: PlaylistVideoService,
    private userService: UserService,
    private progress: NgProgress,
    private router: Router,
    public form: FormBuilder
  ) {

    const formValuesPlaylist = {
      nombre_lista: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      descripcion: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    };

    this.formPlaylist = this.form.group(formValuesPlaylist);

  }

  ngOnInit(): void {
    this.cargarPlaylists();

    this.route.queryParams.subscribe((params) => {
      this.query = params['query'] || '';
      this.executeSearch();
    });
  }

  executeSearch(): void {
    const progressRef = this.progress.ref();
    if (!this.query.trim()) return;
    progressRef.start();
    this.searchService.search(this.query).subscribe({
      next: (response) => {
        progressRef.complete();
        this.searchResults = response;
        console.log(this.searchResults);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error durante la búsqueda:', error);
        this.isLoading = false;
      },
    });
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

  

  toggleDropdown(index: number) {
    if (this.dropdownOpenIndex === index) {
      this.dropdownOpenIndex = -1; // Cierra el dropdown si ya está abierto
      console.log(index);
    } else {
      this.dropdownOpenIndex = index; // Abre el dropdown correspondiente

      console.log(index);
    }
  }

  getVideoLink(videoId: number): string {
    const encodedId = this.hashids.encode(videoId);
    return `/video/${encodedId}`;
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

  
  isVideoInPlaylist(playlist: any, videoId: string): boolean {
    if (playlist && playlist.videos) {
      return playlist.videos.some((video: any) => video.id === videoId);
    }
    return false;
  }

}
