
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';



import { User } from './auth/interfaces/user.model';

/**
 * Serviços do Genero
 */

@Injectable()
export class GeneroService {
  constructor(private http: HttpClient, private router: Router) { }

  cadastroGenero(dados: { name: string}): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/admin/genero`, dados).pipe(
      tap(data => {
        console.log('cadastrado com sucesso');
      }));
  }

  updateGenero(dados: { name: string}, idG: string): Observable<boolean> {
    return this.http.patch<any>(`${environment.api_url}/admin/genero/${idG}`, dados).pipe(
      tap(data => {
        console.log('update realizado com sucesso');
      }));
  }
  deleteGenero(dados: { name: string}, idA: string): Observable<boolean> {
    return this.http.delete<any>(`${environment.api_url}/admin/genero/${idA}`).pipe(
      tap(data => {
        console.log('delete realizado com sucesso');
      }));
  }
}
