import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { ModalCategoriaComponent } from './components/modal-categoria/modal-categoria.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MisVideosComponent } from './components/mis-videos/mis-videos.component';
import { SidebarVideosComponent } from './components/sidebar-videos/sidebar-videos.component';
import { DataTablesModule } from 'angular-datatables';
import { SolicitudVideosComponent } from './components/solicitud-videos/solicitud-videos.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideoDetalleComponent } from './components/video-detalle/video-detalle.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { MisPlaylistsComponent } from './components/mis-playlists/mis-playlists.component';
import { NgProgressModule } from 'ngx-progressbar';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { RevisionVideosComponent } from './components/revision-videos/revision-videos.component';
import { VideosRechazadosComponent } from './components/videos-rechazados/videos-rechazados.component';
import { VideosAceptadosComponent } from './components/videos-aceptados/videos-aceptados.component';
import { HistorialComponent } from './components/historial/historial.component';
import { TendenciasComponent } from './components/tendencias/tendencias.component';
import { SuscripcionesComponent } from './components/suscripciones/suscripciones.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSignupComponent,
    UserLoginComponent,
    CrearCategoriaComponent,
    ModalCategoriaComponent,
    SidebarComponent,
    MisVideosComponent,
    SidebarVideosComponent,
    SolicitudVideosComponent,
    VideosComponent,
    VideoDetalleComponent,
    PerfilUsuarioComponent,
    PlaylistComponent,
    MisPlaylistsComponent,
    MiPerfilComponent,
    RevisionVideosComponent,
    VideosRechazadosComponent,
    VideosAceptadosComponent,
    HistorialComponent,
    TendenciasComponent,
    SuscripcionesComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
