import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { UserService } from '../../services/user/user-service.service';
import { PlaylistVideoService } from '../../services/playlist/playlist-video.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {
  videos: any = {};
  playlists: any = {};
  dropdownOpenIndex: number = -1;
  showListModal: boolean = false;
  showListModalCreatePlaylist: boolean = false;
  selectedVideoId!: string;

  formPlaylist: FormGroup;

  constructor(
    private videoService: VideosService,
    private playlistService: PlaylistService,
    private playlistVideoService: PlaylistVideoService,
    private userService: UserService,
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

  cargarVideos(): void {
    this.videoService.obtenerVideosVerificados().subscribe((respuesta) => {
      console.log(respuesta);
      this.videos = respuesta;
    });
  }

  cargarPlaylists(): void {
    const idUser = localStorage.getItem('userId');
    if (idUser) {
      this.userService.getPlaylistsByUserId(idUser).subscribe((respuesta) => {
        console.log(respuesta);
        console.log("videos");
        this.playlists = respuesta;
  
      });
    }
  }

  toggleAccordion(event: MouseEvent, playlistIndex: number, videoIndex: number) {
    event.preventDefault();
    const video = this.playlists.data[playlistIndex].videos[videoIndex];
    video.expanded = !video.expanded;
  }

  borrarPlaylist(playlist:string){
    Swal.fire({
      title: "Estas seguro",
      text: "Borraras definitivamente esta lista",
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
          icon: "success",
          text: "Lista de reproducción eliminada",
          confirmButtonText:"Borrar"
        });
        this.playlistService.deletePlaylistById(playlist).subscribe(
          (respuesta) => {
            console.log(respuesta);
            this.cargarPlaylists();
          },
          (error) => {
            console.log(error);
          }
        );
      
      }
  })
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
