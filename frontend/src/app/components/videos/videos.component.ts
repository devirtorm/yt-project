import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VideosService } from '../../services/videos/videos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {
  videos: any = {};

  constructor(
    private videoService:VideosService
  ){}

  ngOnInit(): void {
    this.cargarVideos();
  }

  cargarVideos(): void {
    this.videoService.obtenerVideosVerificados().subscribe((respuesta) => {
      console.log(respuesta);
      this.videos = respuesta;
    });
  }
}
