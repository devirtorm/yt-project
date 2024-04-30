import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user-service.service';
import { VideosService } from '../../services/videos/videos.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms'; // Importa FormBuilder
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { error } from 'jquery';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'] // Cambia 'styleUrl' a 'styleUrls'
})
export class MiPerfilComponent implements OnInit {

  videos: any;
  user: any;
  showEditModal: boolean = false;
  videoSeleccionado: any = {};
  editUser!: FormGroup; // Elimina el signo de exclamación
  formVideo!: FormGroup;

  constructor(
    private userService: UserService,
    private videosService: VideosService,
    private route: ActivatedRoute,
    private fb: FormBuilder // Inyecta FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarInfo();
    this.editUser = this.fb.group({ // Inicializa editVideo
      name: [''], // Inicializa con valores vacíos o valores actuales del usuario
      email: [''],
      password: [''],
      nombre_canal: [''], 
      birthdate: [''],
      gender: [''],
      foto: [null] // Para archivos
    });
  }

  editData(): void {
    
      const formData = new FormData();
      
      formData.append('name', this.editUser.value.name);
      formData.append('email', this.editUser.value.email);
      formData.append('password', this.editUser.value.password);
      formData.append('nombre_canal', this.editUser.value.nombre_canal);
      formData.append('birthdate', this.editUser.value.birthdate);
      formData.append('gender', this.editUser.value.gender);
      formData.append('_method', 'PUT');

      
      const id = localStorage.getItem('userId');
      if (id) {
        formData.append('fk_user', id);
      }
      
      formData.append(
        'foto',
        this.editUser.value.foto
      );
  
      // Imprimir los valores de FormData antes de enviar
      console.log('Valores del FormData que se enviarán:');
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
  
      // Envío de datos
      this.userService.updateUser(id || '', formData).subscribe(
        () => {
          console.log('Perfil actualizado exitosamente');
          this.toggleEditModal();  // Cerrar el modal después de editar
          this.cargarVideos();  // Recargar la lista de videos si es necesario

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Perfil editado exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
          this.cargarInfo();
        },
        error => {
          console.error('Error al actualizar el perfil:', error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error tu perfil no pudo ser editado",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
     
  }

  toggleEditModal(user?: any): void {
    this.showEditModal = !this.showEditModal;
    if (user) {
      console.log(user.data.name);
      this.editUser.patchValue({
        name: user.data.name,
        email: user.data.email,
        password: user.data.password,
        nombre_canal: user.data.nombre_canal,
        birthdate: user.data.birthdate,
        gender: user.data.gender
      });
      this.videoSeleccionado = { ...user };
    } else {
      this.videoSeleccionado = {};
    }
  }



onFileSelected(event: any, controlName: string): void {
  if (event.target.files && event.target.files.length) {
    const file = event.target.files[0];
    this.formVideo.get(controlName)?.setValue(file);
  }
}


  cargarInfo(): void {
    const id = localStorage.getItem('userId'); // Obtiene el ID del video de los parámetros de la ruta
    if (id !== null) {
      // Verifica que id no sea null
      this.userService.getUser(id).subscribe(
        (data: any) => {
          // Manejo de la respuesta exitosa
          this.user = data; // Almacena los datos del usuario recuperados del servicio
          console.log(this.user); // Imprime los datos del usuario en la consola
          this.cargarVideos();
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
