import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user-service.service';
import { HistorialService } from '../../services/historial/historial.service';
import { VideosService } from '../../services/videos/videos.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistVideoService } from '../../services/playlist/playlist-video.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Hashids from 'hashids';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css'
})
export class TendenciasComponent implements OnInit {
  videos : any  = {}
  formPlaylist: FormGroup;

  playlists: any = {};
  dropdownOpenIndex: number = -1;
  showListModal: boolean = false;
  showListModalCreatePlaylist: boolean = false;
  selectedVideoId!: string;

  private hashids = new Hashids('kX7#5@8Uw!9Rq2Tz', 12);

  constructor(
    private userService: UserService,
    private historialService: HistorialService,
    private videoService: VideosService,
    private playlistService: PlaylistService,
    private playlistVideoService: PlaylistVideoService,
    private router: Router,
    public form: FormBuilder
  ) {
    const formValuesPlaylist = {
    nombre_lista: [''],
    descripcion: [''],
  };

  this.formPlaylist = this.form.group(formValuesPlaylist);
}
  ngOnInit(): void {
    this.cargarVideos();
    this.cargarPlaylists();
    
  }

  cargarVideos(): void {


      this.historialService.tendencias().subscribe((respuesta) => {
        console.log(respuesta); 
        this.videos = respuesta;
    })

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

  
  getVideoLink(videoId: number): string {
    const encodedId = this.hashids.encode(videoId);
    return `/video/${encodedId}`;
  }

  cargarPlaylists(): void {
    const idUser = localStorage.getItem('userId');
    if (idUser) {
      this.userService.getPlaylistsByUserId(idUser).subscribe((respuesta) => {
        console.log(respuesta);
        console.log("videos");
        this.playlists = respuesta;
  
        // Obtener videos asociados a cada lista de reproducción
        this.playlists.data.forEach((playlist: any) => {
          this.playlistService.getPlaylistVideos(playlist.id).subscribe((videos: any) => {
            playlist.videos = videos; // Agregar la lista de videos a la lista de reproducción
          });
        });
      });
    }
  }
  

  saveVideoOnlist(playlistId: string) : void{
    console.log(this.selectedVideoId);
    const formData = new FormData()
    formData.append('fk_video', this.selectedVideoId);
    formData.append('fk_playlist', playlistId);

     this.playlistVideoService.savePlaylistVideo(formData).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Tu comentario se ha publicado',
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
          text: 'Tu comentario se ha publicado',
          showConfirmButton: false,
          timer: 1500,
          backdrop: false,
        });
        this.cargarPlaylists();
        this.saveVideoOnlist(response.playlist.id);
        this.toggleModal()
      },
      (error) => {
        // Maneja el error si ocurre
        console.error('Error al guardar el comentario:', error);
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

