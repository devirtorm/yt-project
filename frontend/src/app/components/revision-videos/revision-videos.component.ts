import { Component, ViewChild } from '@angular/core';
import { VideosRechazadosComponent } from '../videos-rechazados/videos-rechazados.component';
import { VideosService } from '../../services/videos/videos.service';

@Component({
  selector: 'app-revision-videos',
  templateUrl: './revision-videos.component.html',
  styleUrls: ['./revision-videos.component.css']
})
export class RevisionVideosComponent {
  mostrarComponenteRechazados: boolean = false;
  @ViewChild('videosRechazados') videosRechazados!: VideosRechazadosComponent;

  constructor(private videoServicio: VideosService) {}

  videoAceptadoHandler(): void {
    this.mostrarComponenteRechazados = true; // Muestra el componente que contiene la pestaña de videos rechazados
  }

  videoRechazadoHandler(): void {
    this.mostrarComponenteRechazados = true; // Muestra el componente que contiene la pestaña de videos rechazados
  }

  recargarVideosRechazados(): void {
    // Llama a la función para cargar los videos rechazados en VideosRechazadosComponent
    this.videosRechazados.cargarVideos();
  }
}
