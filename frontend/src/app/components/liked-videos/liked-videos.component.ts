import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user-service.service';
import { VideosService } from '../../services/videos/videos.service';
import Hashids from 'hashids';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistVideoService } from '../../services/playlist/playlist-video.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.css'
})
export class LikedVideosComponent implements OnInit {
  videos: any = {};
  playlists: any = {};
  dropdownOpenIndex: number = -1;
  showListModal: boolean = false;
  showListModalCreatePlaylist: boolean = false;
  selectedVideoId!: string;
  private hashids = new Hashids('kX7#5@8Uw!9Rq2Tz', 12);
  formPlaylist!: FormGroup;

  ngOnInit(): void {
    this.cargarVideos();
    this.cargarPlaylists();
  }

  constructor(
    private videoService: VideosService,
    private playlistService: PlaylistService,
    private playlistVideoService: PlaylistVideoService,
    private userService: UserService,
    private router: Router,
    public form: FormBuilder
  ) { }


  getVideoLink(videoId: number): string {
    const encodedId = this.hashids.encode(videoId);
    return `/video/${encodedId}`;
  }


  cargarVideos(): void {
    const idUser = localStorage.getItem('userId');
    if (idUser) {
      this.userService.getLikedVideosByUserId(idUser).subscribe((respuesta) => {
        console.log(respuesta);
        this.videos = respuesta;
      });
    }
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
