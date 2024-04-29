import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { MisVideosComponent } from './components/mis-videos/mis-videos.component';
import { SolicitudVideosComponent } from './components/solicitud-videos/solicitud-videos.component';
import { VideosComponent } from './components/videos/videos.component';
import { AuthGuard } from './guards/guard.service';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { VideoDetalleComponent } from './components/video-detalle/video-detalle.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';


const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo: 'UserSignupComponent'},
  {path:'sign-up', component: UserSignupComponent},
  {path:'login', component: UserLoginComponent},
  {path:'categorias', component: CrearCategoriaComponent, canActivate: [AuthGuard]},
  {path:'mis-videos', component: MisVideosComponent, canActivate: [AuthGuard]},
  {path:'solicitud-videos', component: SolicitudVideosComponent, canActivate: [AuthGuard]},
  {path:'', component: VideosComponent},
  {path:'video/:id', component: VideoDetalleComponent},
  {path:'profile/:id', component: PerfilUsuarioComponent},
  {path:'playlist', component: PlaylistComponent},
  {path:'mi-perfil', component: MiPerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
