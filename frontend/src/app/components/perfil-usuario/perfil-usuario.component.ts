import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from '../../services/videos/videos.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit  {

  video: any; // Variable para almacenar los datos del video
  user:any;

  constructor(
    private userService: UserService,
    private videosService: VideosService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.cargarInfo();

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
    this.videosService.getCommentsByVideoId(this.video.data.id).subscribe(
      (data: { comentarios: Comment[] }) => { // Aquí estás tipando los datos recibidos como un arreglo de comentarios
        this.video = data;

        console.log(this.video);
      },
      (error) => {
        console.error('Error al cargar comentarios:', error);
      }
    );
  }
  
}
