import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { AplicationErrorHandle } from './app.error-handle';
import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { ArtistasComponent } from './artistas/artistas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { GeneroComponent } from './genero/genero.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListAllComponent } from './list-all/list-all.component';
import { GeneroListComponent } from './genero-list/genero-list.component';
import { ArtistaListComponent } from './artista-list/artista-list.component';
import { ArtistaListUpdateComponent } from './artista-list/artista-list-update/artista-list-update.component';
import { GeneroListUpdateComponent } from './genero-list/genero-list-update/genero-list-update.component';
import { CadastroGeneroArtistaComponent } from './cadastro/cadastro-genero-artista/cadastro-genero-artista.component';
import { CadastroUpdateComponent } from './cadastro/cadastro-update/cadastro-update.component';
import { MostrarComponent } from './list-all/mostrar/mostrar.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistasComponent,
    HomeComponent,
    GeneroComponent,
    CadastroComponent,
    ListAllComponent,
    GeneroListComponent,
    ArtistaListComponent,
    ArtistaListUpdateComponent,
    GeneroListUpdateComponent,
    CadastroGeneroArtistaComponent,
    CadastroUpdateComponent,
    MostrarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    AdminModule
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    {provide: ErrorHandler, useClass: AplicationErrorHandle }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
