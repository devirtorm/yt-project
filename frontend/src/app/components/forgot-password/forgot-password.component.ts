import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { ForgotPasswordService } from '../../services/auth/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  formResetPassword: FormGroup; 

  constructor(
    private form: FormBuilder,
    private authService: AuthService,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.formResetPassword = this.form.group({
      email: ['', [Validators.required, Validators.email]],
    });
    
  }

  
  ngOnInit(): void {
  }


  saveData(): void {
    if (this.formResetPassword) { // Verificar si formResetPassword no es nulo
      if (this.formResetPassword.valid) {
        console.log(this.formResetPassword.value);
        const email = this.formResetPassword.get('email')?.value; // Usar operador opcional (?)
        if (email) { // Verificar si email no es nulo
          this.forgotPasswordService.forgotPassword(email).subscribe(
            (response) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Código enviado a tu correo electrónico",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                location.href = "/reset-password";
              });
            },
            (error) => {
              console.error(error);
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Correo no registrado",
                text:"No pudimos encontrar este correo en nuestros registros",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          );
        } else {
          console.error('El valor del correo electrónico es nulo');
        }
      } else {
        console.log('Formulario no es válido');
      }
    } else {
      console.error('formResetPassword es nulo');
    }
  }
  
  



}
