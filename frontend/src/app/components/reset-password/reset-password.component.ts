import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { ForgotPasswordService } from '../../services/auth/forgot-password.service';
import { VerifyPinService } from '../../services/auth/verify-pin.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  formPinConfirmation: FormGroup;


  constructor(
    private form: FormBuilder,
    private verifypinService: VerifyPinService,
    private authService: AuthService,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.formPinConfirmation = this.form.group({
      pin: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  ngOnInit(): void {
  }


  submitPin(): void {
    if (this.formPinConfirmation && this.formPinConfirmation.valid) {
      const pin = this.formPinConfirmation.get('pin')?.value;
      if (pin) {
        // Aquí puedes enviar el PIN al servidor para confirmación
        this.verifypinService.verifyPin(pin).subscribe(
          (response) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Codigo correcto",
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
              title: "Codigo incorrecto",
              text:"Vuelve a intentarlo",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      } else {
        console.error('El valor del PIN es nulo');
      }
    } else {
      console.log('Formulario de confirmación de PIN no es válido');
    }
  }
  
  



}
