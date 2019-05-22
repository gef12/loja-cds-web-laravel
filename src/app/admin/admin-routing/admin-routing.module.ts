import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './../../guards/auth.guard';
import { AdminComponent } from './../admin.component';
import { AdminDashboard1Component } from './../admin-dashboard1/admin-dashboard1.component';
import { AdminDashboard2Component } from './../admin-dashboard2/admin-dashboard2.component';
import { ProfileComponent } from './../../auth/profile/profile.component';
import { ArtistasComponent } from '../../artistas/artistas.component';
import { GeneroComponent } from '../../genero/genero.component';
import { HomeComponent } from '../../home/home.component';
import { CadastroComponent } from '../../cadastro/cadastro.component';
import { ListAllComponent } from '../../list-all/list-all.component';
import { GeneroListComponent } from '../../genero-list/genero-list.component';
import { ArtistaListComponent } from '../../artista-list/artista-list.component';
import { ArtistaListUpdateComponent } from '../../artista-list/artista-list-update/artista-list-update.component';
import { GeneroListUpdateComponent } from '../../genero-list/genero-list-update/genero-list-update.component';
import { CadastroGeneroArtistaComponent } from '../../cadastro/cadastro-genero-artista/cadastro-genero-artista.component';
import { CadastroUpdateComponent } from '../../cadastro/cadastro-update/cadastro-update.component';
import { MostrarComponent } from '../../list-all/mostrar/mostrar.component';

/**
 * Rotas de todos os componentes
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          { path: 'artistas', component: ArtistasComponent },
          { path: 'dashboard1', component: AdminDashboard1Component },
          { path: 'dashboard2', component: AdminDashboard2Component },
          { path: 'profile', component: ProfileComponent },
          { path: 'genero', component: GeneroComponent },
          { path: 'cadastro', component: CadastroComponent },
          { path: 'home', component: HomeComponent },
          { path: 'list', component: ListAllComponent },

          { path: 'generosListDelete/:id', component: GeneroListComponent },
          { path: 'generosList', component: GeneroListComponent },
          { path: 'generosList/:id', component: GeneroListUpdateComponent },

          { path: 'artistasList', component: ArtistaListComponent },
          { path: 'artistasList/:id', component: ArtistaListUpdateComponent },
          { path: 'cadastroProx/:id', component: CadastroGeneroArtistaComponent },
          { path: 'updateCd/:id', component: CadastroUpdateComponent },
          { path: 'mostrar/:id', component: MostrarComponent },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
