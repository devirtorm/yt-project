import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService} from '../services/user/user-service.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit {

  formUser:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private userService:UserService,
    private ruteador:Router
    ){
    this.formUser=this.formulario.group({
      name:[''],
      email:[''],
      birthdate:[''],
      password:[''],
      gender:['']
    });
  }

  saveData():any {
    console.log(this.formUser.value);
    this.userService.storeUser(this.formUser.value).subscribe();
    this.ruteador.navigateByUrl('/sign-up');
  
   }

  ngOnInit():void {
  }

}
