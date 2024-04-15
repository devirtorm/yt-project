import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  formLogin: FormGroup;

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
      },
      (error) => {
        console.error(error); 
      }
    );
  }

  ngOnInit(): void {
  }
}
