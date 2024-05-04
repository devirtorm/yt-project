import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user-service.service';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrl: './registro-usuarios.component.css'
})
export class RegistroUsuariosComponent {
  formUser: FormGroup;
  formLogin: FormGroup;
  showEditModal: boolean = false;
  showModal: boolean = false;
  editUser!: FormGroup; 
  videoSeleccionado: any = {};
  users: any= {};
  user: any;
  videos: any;
  formVideo!: FormGroup;

  onFileSelected(event: any, controlName: string): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.formVideo.get(controlName)?.setValue(file);
    }
  }

  suspender(id: string): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de suspender a este usuario.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Suspender",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Crear un objeto FormData y añadir el campo estado
  
        this.userService.updateState(id, 0).subscribe(
          response => {
            Swal.fire(
              "Suspendido!",
              "El usuario ha sido suspendido exitosamente.",
              "success"
            );
            this.loadUsers(); // Recargar la lista de usuarios para reflejar los cambios.
          },
          error => {
            console.error('Error al suspender al usuario:', error);
            Swal.fire({
              icon: "error",
              title: "Error al procesar la petición",
              text: 'No fue posible suspender al usuario.',
              confirmButtonText: "Aceptar"
            });
          }
        );
      }
    });
  }

  habilitar(id: string): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de habilitar a este usuario.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Habilitar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {


        
  
        this.userService.updateState(id,1).subscribe(
          response => {
            Swal.fire(
              "Suspendido!",
              "El usuario se ha habilitado exitosamente.",
              "success"
            );
            this.loadUsers(); // Recargar la lista de usuarios para reflejar los cambios.
          },
          error => {
            console.error('Error al habilitar al usuario:', error);
            Swal.fire({
              icon: "error",
              title: "Error al procesar la petición",
              text: 'No fue posible habilitar al usuario.',
              confirmButtonText: "Aceptar"
            });
          }
        );
      }
    });
  }

  constructor(
    private formulario: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Agregar los roles al formulario
    const formValues = {
      name: [''],
      email: [''],
      birthdate: [''],
      password: [''],
      nombre_canal: [''],
      gender: [''],
      roles: ['']
    };
    const formValuesLogin = {
      email: [''],
      password: [''],
    };

    this.formLogin = this.formulario.group(formValuesLogin);

    this.formUser = this.formulario.group(formValues);
  }

  saveData(): any {
    this.formUser.patchValue({
      roles: 3 // Aquí asignamos el valor 1 al campo roles
    });
    console.log(this.formUser.value);
    this.userService.storeUser(this.formUser.value).subscribe(
      (response) => {
        console.log(response); // Aquí puedes manejar la respuesta
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registrado',
          text: 'Nuevo administrador registrado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.toggleModal();
      },
      (error) => {
        console.error(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Correo o contraseña erróneos',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  login(): void {
    console.log(this.formLogin.value);
    this.authService.login(this.formLogin.value).subscribe(
      (response) => {
        console.log(response); // Aquí puedes manejar la respuesta
        // Tomar el ID del usuario de la respuesta
        const userId = response.user.id;
        const rol = response.user.roles[0].id;
        // Almacenar el ID en el localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('rol', rol);
        // Almacenar el token de acceso completo en el localStorage (si es necesario)
        localStorage.setItem('token', response.access_token);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bienvenido" + response.user.name,
          showConfirmButton: false,
          timer: 1500,
        });
        this.showModal = !this.showModal;
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Correo o contraseña erróneos",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
  

  ngOnInit(): void {
    this.loadUsers();
    console.log(this.showModal);
    this.cargarInfo();
    this.editUser = this.fb.group({ // Inicializa editVideo
      name: [''],
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
    if (this.editUser.value.password) { // Solo añadir si hay una nueva contraseña
      formData.append('password', this.editUser.value.password);
    }
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
        console.log('Usuario actualizado exitosamente');
        this.toggleEditModal();  // Cerrar el modal después de editar
        this.cargarVideos();  // Recargar la lista de videos si es necesario

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario editado exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
        this.cargarInfo();
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error el usuario no pudo ser editado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
   
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

loadUsers(): void {
  this.userService.getUsers().subscribe({
    next: (data) => {
      console.log("Datos recibidos:", data); // Esto te mostrará lo que recibes del backend
      this.users = data;
    },
    error: (err) => {
      console.error('Error al cargar usuarios:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar usuarios',
        text: 'No se pudo cargar la lista de usuarios',
      });
    }
  });
}

  toggleEditModal(user?: any): void {
    this.showEditModal = !this.showEditModal;
    if (user) {
      console.log(user.name);
      this.editUser.patchValue({
        name: user.name,
        email: user.email,
        password: user.password,
        nombre_canal: user.nombre_canal,
        birthdate: user.birthdate,
        gender: user.gender
      });
      this.videoSeleccionado = { ...user };
    } else {
      this.videoSeleccionado = {};
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
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
}
