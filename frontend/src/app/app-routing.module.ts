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
import { RevisionVideosComponent } from './components/revision-videos/revision-videos.component';
import { HistorialComponent } from './components/historial/historial.component';
import { TendenciasComponent } from './components/tendencias/tendencias.component';
import { SuscripcionesComponent } from './components/suscripciones/suscripciones.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { PapeleraComponent } from './components/papelera/papelera.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: VideosComponent }, // Ruta raíz que renderiza VideosComponent
  { path: 'sign-up', component: UserSignupComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'tendencias', component: TendenciasComponent },
  { path: 'video/:id', component: VideoDetalleComponent },
  { path: 'profile/:id', component: PerfilUsuarioComponent },
  { path: 'categorias', component: CrearCategoriaComponent, canActivate: [AuthGuard], data: { expectedRol: '3' }},
  { path: 'mis-videos', component: MisVideosComponent, canActivate: [AuthGuard], data: { expectedRol: '2' }},
  { path: 'solicitud-videos', component: SolicitudVideosComponent, canActivate: [AuthGuard], data: { expectedRol: '3' }},
  { path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuard],  data: { expectedRol: '2'}},
  { path: 'mi-perfil', component: MiPerfilComponent, canActivate: [AuthGuard], data: { expectedRol: '2' || '3' }},
  { path: 'revision-videos', component: RevisionVideosComponent, canActivate: [AuthGuard], data: { expectedRol: '3' }},
  { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard], data: { expectedRol: '2' || '3' }},
  { path: 'suscripciones', component: SuscripcionesComponent, canActivate: [AuthGuard], data: { expectedRol: '2' }},
  { path: 'registro-usuarios', component: RegistroUsuariosComponent, canActivate: [AuthGuard], data: { expectedRol: '3' }},
  { path: 'access-denied', component: AccessDeniedComponent},
  
  { path: '**', component: NotFoundPageComponent } // Ruta para cualquier otra ruta no definida
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
