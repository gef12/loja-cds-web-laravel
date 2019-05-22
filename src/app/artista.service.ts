
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';



import { User } from './auth/interfaces/user.model';

/**
 * Serviços do Artista
 */
@Injectable()
export class ArtistaService {
  constructor(private http: HttpClient, private router: Router) { }

  cadastroArtista(dados: { name: string}): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/admin/artistas`, dados).pipe(
      tap(data => {
        console.log('cadastrado com sucesso');
      }));
  }

  buscaArtista(): Promise<boolean> {
    return this.http.get<any>(`${environment.api_url}/admin/artistas/me`).toPromise()
      .then(data => {
        if (data.name) {
          return true;
        }
        return false;
      });
  }

  updateArtista(dados: { name: string}, idA: string): Observable<boolean> {
    return this.http.patch<any>(`${environment.api_url}/admin/artistas/${idA}`, dados).pipe(
      tap(data => {
        console.log('update realizado com sucesso');
      }));
  }

  deleteArtista(dados: { name: string}, idA: string): Observable<boolean> {
    return this.http.delete<any>(`${environment.api_url}/admin/artistas/${idA}`).pipe(
      tap(data => {
        console.log('delete realizado com sucesso');
      }));
  }



}
