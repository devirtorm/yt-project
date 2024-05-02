import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  formLogin: FormGroup;
  @Input() toggleModal!: Function;
 

  constructor(
    private form: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const formValues = {
      email: [''],
      password: [''],
    };

    this.formLogin = this.form.group(formValues);
  }

  saveData(): void {
    console.log(this.formLogin.value);
    this.authService.login(this.formLogin.value).subscribe(
      (response) => {
        console.log(response); // Aquí puedes manejar la respuesta
/*         const userId = response.user.id;
        const rol = response.user.roles[0].id;
        console.log("este es el rol" + response.user.roles[0].id);
        // Almacenar el ID en el localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('rol', rol); */

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bienvenido " + response.user.name,
          showConfirmButton: false,
          timer: 1500,
        });
      
        this.toggleModal();
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
  }
}
