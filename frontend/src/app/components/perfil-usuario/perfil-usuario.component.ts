import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { VideosService } from '../../services/videos/videos.service';
import { SuscripcionService } from '../../services/suscripcion/suscripcion.service';

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
  contador: any;

  constructor(
    private userService: UserService,
    private videosService: VideosService,
    private suscripcionService: SuscripcionService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.cargarInfo();
    

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
  
}
