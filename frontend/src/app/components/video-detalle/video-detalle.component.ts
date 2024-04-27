import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from '../../services/videos/videos.service';

@Component({
  selector: 'app-video-detalle',
  templateUrl: './video-detalle.component.html',
  styleUrl: './video-detalle.component.css'
})
export class VideoDetalleComponent implements OnInit {
  video: any; // Variable para almacenar los datos del video

  constructor(private route: ActivatedRoute, private videoService: VideosService) { }

  ngOnInit(): void {
    this.cargarInfo();
    this.cargarComentarios();
  }

  cargarInfo(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID del video de los parámetros de la ruta
    if (id !== null) { // Verifica que id no sea null
      this.videoService.getVideoById(id).subscribe((data: any) => {
        this.video = data; // Almacena los datos del video recuperado del servicio
        console.log(this.video); // Imprime los datos del video en la consola
      });
    } else {
      // Manejo de error o redirección si id es null
    }
  }

  cargarComentarios(): void {
    console.log(this.video.id);
  }

}


