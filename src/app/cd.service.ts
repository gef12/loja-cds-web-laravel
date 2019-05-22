
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';


import { ArtistaService } from './artista.service';
import { GeneroService } from './genero.service';

@Injectable()
export class CdsService {
  constructor(private http: HttpClient, private router: Router, private artista: ArtistaService, private genero: GeneroService) { }

  public contadorA = 0;
  public contadorG = 0;
  public valorCd = '0';
  public contDelete = 0;
  public buscandoDeleteCds;
  public var1: Array<any>;


  /**
   * serviços do cd
   */
  cadastroCds(dados: { name: string}): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/admin/cds`, dados).pipe(
      tap(data => {
        console.log('cadastrado com sucesso');
      }));
  }

  buscaCds(): Promise<boolean> {
    return this.http.get<any>(`${environment.api_url}/admin/artistas/me`).toPromise()
      .then(data => {
        if (data.name) {
          return true;
        }
        return false;
      });
  }

  updateCds(dados: { name: string}, idA: string): Observable<boolean> {
    return this.http.patch<any>(`${environment.api_url}/admin/cds/${idA}`, dados).pipe(
      tap(data => {
        console.log('update realizado com sucesso');
      }));
  }

  deleteCds(dados: { name: string}, idA: string): Observable<boolean> {
    console.log('service ', idA);
    return this.http.delete<any>(`${environment.api_url}/admin/cds/${idA}`).pipe(
      tap(data => {
        console.log('delete realizado com sucesso');
      }));
  }

  deleteGeneroCds(dados: { name: string}, idCds: string, idG: string) {

    return this.http.post<any>(`${environment.api_url}/admin/cdsAAA/${idCds}`, dados).pipe(
      tap(data => {
        console.log('delete realizado com sucesso');
      }));

  }
  deleteArtistasCds(dados: { name: string}, idCds: string, idG: string) {

    return this.http.post<any>(`${environment.api_url}/admin/cdsAAA/${idCds}`, dados).pipe(
      tap(data => {
        console.log('delete realizado com sucesso');
      }));

  }

  incluirArtistaCds(dados: { name: string}, idCds: any, idA: any) {
    return this.http.post<any>(`${environment.api_url}/admin/cds/adicionarArtista`, dados).pipe(
    tap(data => {
      console.log('inclusão realizado com sucesso');
    }));
  }

  incluirGeneroCds(dados: { name: string}, idCds: string, idG: string) {
    return this.http.post<any>(`${environment.api_url}/admin/cdsAAA/${idCds}`, dados).pipe(
    tap(data => {
      console.log('inclusão realizado com sucesso');
    }));
  }
 verificarCdsSemArtista(idCd): any {

      return this.http.get<any>(`${environment.api_url}/admin/cds/artista/${idCd}`).toPromise()
      .then(data => {
        if (data['cd_id'] != null) {
          return true;
        }
        return false;
      });
  }

 verificarCdsSemGenero(idCd): any {
    return this.http.get<any>(`${environment.api_url}/admin/cds/genero/${idCd}`).toPromise()
    .then(data => {
      if (data['cd_id'] != null) {
        return true;
      }
      return false;
    });

}
}
