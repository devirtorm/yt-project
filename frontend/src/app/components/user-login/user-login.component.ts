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
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('userId', response.user.id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bienvenido" + response.user.name,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('/');
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
