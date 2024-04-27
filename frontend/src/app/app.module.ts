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
import { SidebarComponent } from './sidebar/sidebar.component';
import { MisVideosComponent } from './components/mis-videos/mis-videos.component';
import { SidebarVideosComponent } from './components/sidebar-videos/sidebar-videos.component';
import { DataTablesModule } from 'angular-datatables';
import { SolicitudVideosComponent } from './components/solicitud-videos/solicitud-videos.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideoDetalleComponent } from './components/video-detalle/video-detalle.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';


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
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
