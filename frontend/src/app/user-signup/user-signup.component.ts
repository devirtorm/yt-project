import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user-service.service';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit {
  formUser: FormGroup;
  formLogin: FormGroup;
  showModal: boolean = false;

  constructor(
    private formulario: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    // Agregar los roles al formulario
    const formValues = {
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]], // Solo letras y espacios permitidos
      email: ['', [Validators.required, Validators.email]],  // Validación de email estándar
      birthdate: ['', Validators.required],  // Fecha de nacimiento requerida
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],  // Solo letras y números en contraseña
      nombre_canal: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]], // Solo letras y espacios permitidos
      gender: ['', Validators.required],  // Género requerido
      roles: [''],   // Rol requerido
    };
  
    // Valores y validaciones para el formulario de login
    const formValuesLogin = {
      email: ['', [Validators.required, Validators.email]],         // Validación de email estándar
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],  // Solo letras y números en contraseña
    };
  
    this.formLogin = this.formulario.group(formValuesLogin);
    this.formUser = this.formulario.group(formValues);
  }

  saveData(): any {
    this.formUser.patchValue({
      roles: 2 // Aquí asignamos el valor 1 al campo roles
    });
    console.log(this.formUser.value);
    this.userService.storeUser(this.formUser.value).subscribe(
      (response) => {
        console.log(response); // Aquí puedes manejar la respuesta
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario registrado',
          text: 'Ahora inicia sesión',
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
          title: "Bienvenido " + response.user.name,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          location.href = "/";
        });
        this.showModal = !this.showModal;
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
    console.log(this.showModal);
    
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
