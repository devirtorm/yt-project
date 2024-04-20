import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { MisVideosComponent } from './components/mis-videos/mis-videos.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo: 'UserSignupComponent'},
  {path:'sign-up', component: UserSignupComponent},
  {path:'categorias', component: CrearCategoriaComponent},
  {path:'mis-videos', component: MisVideosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
