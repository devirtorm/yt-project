import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { ForgotPasswordService } from '../../services/auth/forgot-password.service';
import { VerifyPinService } from '../../services/auth/verify-pin.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  formResetPassword: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.formResetPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  
  ngOnInit(): void {
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  saveData(): void {
    const resetPin = localStorage.getItem('resetPin');
    if (this.formResetPassword && resetPin) { // Verificar si formResetPassword no es nulo
      if (this.formResetPassword.valid) {
        console.log(this.formResetPassword.value);
        const email = this.formResetPassword.get('email')?.value; // Usar operador opcional (?)
        if (email) { // Verificar si email no es nulo
          const formData = new FormData();
          formData.append('email', email);
          formData.append('pin', resetPin);
          formData.append('password', this.formResetPassword.get('password')?.value);
          formData.append('_method','PUT');

          this.forgotPasswordService.resetPassword(formData).subscribe(
            (response) => {
              localStorage.removeItem('resetPin');
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Código enviado a tu correo electrónico",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                location.href = "/login";
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