import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    this.formLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ]]
    });
  }


  saveData(): void {
    console.log(this.formLogin.value);
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        (response) => {
  
          console.log(response); // Aquí puedes manejar la respuesta
          const userId = response.user.id;
          const rol = response.user.roles[0].id;
          console.log("este es el rol" + response.user.roles[0].id);
          // Almacenar el ID en el localStorage
          localStorage.setItem('userId', userId);
          localStorage.setItem('rol', rol);
  
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
    } else {
      console.log('Formulario no es válido');
    }

  }
  

  ngOnInit(): void {
  }


}
