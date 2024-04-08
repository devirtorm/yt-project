import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignupComponent } from './user-signup/user-signup.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo: 'UserSignupComponent'},
  {path:'sign-up', component: UserSignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
