import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user-service.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit {

  formUser: FormGroup;

  constructor(
    public formulario: FormBuilder,
    private userService: UserService,
    private ruteador: Router
  ) {
    // Agregar los roles al formulario
    const formValues = {
      name: [''],
      email: [''],
      birthdate: [''],
      password: [''],
      gender: [''],
      roles: [''] 
    };
    this.formUser = this.formulario.group(formValues);
  } 

  saveData(): any {
    this.formUser.patchValue({
      roles: [1,2] // Aquí asignamos el valor 1 al campo roles
    });
    console.log(this.formUser.value);
    this.userService.storeUser(this.formUser.value).subscribe();
    this.ruteador.navigateByUrl('/sign-up');
  }

  ngOnInit(): void {
  }   

}
