import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ArtistaService } from '../artista.service';
import { GeneroService } from '../genero.service';
import { CdsService } from '../cd.service';
/**
 * Serviço responsavel por liberar as rotas e regristar serviços aos outros modulos
 */

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    LoginComponent,
    ProfileComponent
  ],
  providers: [
    AuthService,
    ArtistaService,
    GeneroService,
    CdsService
  ]
})
export class AuthModule { }
