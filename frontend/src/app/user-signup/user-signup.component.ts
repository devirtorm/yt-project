import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      name: [''],
      email: [''],
      birthdate: [''],
      password: [''],
      gender: [''],
      roles: [''],
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
      roles: [1, 2], // Aquí asignamos el valor 1 al campo roles
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
        // Almacenar el ID en el localStorage
        localStorage.setItem('userId', userId);
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
    console.log(this.showModal);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
