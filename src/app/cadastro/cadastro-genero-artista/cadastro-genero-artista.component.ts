import { CdsService } from './../../cd.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { Genero } from '../../shared/generos.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeneroService } from '../../genero.service';
import { Artista } from '../../shared/artista.model';

@Component({
  selector: 'app-cadastro-genero-artista',
  templateUrl: './cadastro-genero-artista.component.html',
  styleUrls: ['./cadastro-genero-artista.component.css']
})
export class CadastroGeneroArtistaComponent implements OnInit {

  public formulario: FormGroup;
  public generoCds: Genero;
  public artistaCds: Artista;
  public genero: Genero;
  public artista: Artista;
  public errorCredentials: false;
  public id: string;
  public cds: string;
  public cont = true;

  /**
   * Faz o Regristro de pelo menos 1 artista e 1 genero caso contrario o Cd sera deletado
   */

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private generoService: GeneroService, private cdsService: CdsService) {

      this.route.params.subscribe(params => {
        this.paramsChange(params.id);
    });
  }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
      console.log('parametros : ', this.id);

    this.cdsService.valorCd = this.id;

    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });

    /**
     * rotas para pegar generos e artisdas os que ja estão no cd
     */
    this.http.get<any>(`${environment.api_url}/admin/cds/allGeneros/${this.id}`).subscribe(data => {
      this.generoCds = data;
      this.cdsService.contadorG = parseInt(data.length, 10);
    });

    this.http.get<any>(`${environment.api_url}/admin/cds/allArtistas/${this.id}`).subscribe(data => {
      this.artistaCds = data;
      this.cdsService.contadorA = parseInt(data.length, 10);
    });
    /**
     * rotas para pegar todos os generos e artistas disponiveis.
     */

    this.http.get<Genero>(`${environment.api_url}/admin/genero`).subscribe(data => {
      this.genero = data;
    });
    this.http.get<Artista>(`${environment.api_url}/admin/artistas`).subscribe(data => {
      this.artista = data;
    });

    /**
     *
    this.http.post<any>(`${environment.api_url}/admin/cds/${this.id}`, this.id).subscribe(data => {
      this.cds = data;
      console.log(this.cds);
    });
    */
    if (this.cdsService.contadorA > 0 && this.cdsService.contadorG > 0) {
      this.cont = false;
    }
    console.log('teste do contador artista: ', this.cdsService.contadorA);
    console.log('teste do contador genero: ', this.cdsService.contadorG);
  }
  deletarGeneroCds(idG) {
    this.cdsService.contadorG = this.cdsService.contadorG - 1;
    return this.http.get<any>(`${environment.api_url}/admin/cds/removeGenero/${this.id}/${idG}`).toPromise()
    .then(data => {
      if (data.success === true) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([`admin/cadastroProx/${this.id}`]));
        return true;
      }
      return false;
    });
  }

  deletarArtistaCds(idA) {
    this.cdsService.contadorA = this.cdsService.contadorA - 1;
    return this.http.get<any>(`${environment.api_url}/admin/cds/removeArtista/${this.id}/${idA}`).toPromise()
    .then(data => {
      if (data.success === true) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([`admin/cadastroProx/${this.id}`]));
        return true;
      }
      return false;
    });
  }
  incluirArtistaCds(idA) {
    this.cdsService.contadorA = this.cdsService.contadorA + 1;
    return this.http.get<any>(`${environment.api_url}/admin/cds/adicionarArtista/${this.id}/${idA}`).toPromise()
    .then(data => {
      if (data.success === true) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([`admin/cadastroProx/${this.id}`]));
        return true;
      }
      return false;
    });
  }

  incluirGeneroCds(idG) {

    this.cdsService.contadorG = this.cdsService.contadorG + 1;
    return this.http.get<any>(`${environment.api_url}/admin/cds/adicionarGenero/${this.id}/${idG}`).toPromise()
    .then(data => {
      if (data.success === true) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([`admin/cadastroProx/${this.id}`]));
        return true;
      }
      return false;
    });
    /**

    console.log('parametro Genero', idG);
    this.cdsService.incluirArtistaCds(this.formulario.value, this.id, idG ).subscribe(
      (resp) => {
        this.router.navigated = false;
        this.router.navigate(['admin/generosList']);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = false;
        }
      }
    );
    */

  }


  onSubmit() {
    /**
     * Verificando se O cd Possui pelo menos 1 artista e um genero caso contrario o mesmo sera deletado
     */

     let var1: Array<any>;
     let var2: Array<any>;

    this.http.get<any>(`${environment.api_url}/admin/cds/artista/${this.id}`).subscribe(data => {
      var1 = data;
      console.log('var 1', var1);
    });

    this.http.get<any>(`${environment.api_url}/admin/cds/genero/${this.id}`).subscribe(data => {
      var2 = data;
      console.log('var 2', var2);
    });

    console.log('esperando time aut');
    setTimeout( () => {

      if (var1.length !== 0  && var2.length !== 0) {
        this.router.navigate(['admin/list']);
      } else {
        console.log('delete entrou aqui', this.id);
        this.cdsService.deleteCds(this.formulario.value, this.id ).subscribe(
          (resp) => {
            this.router.navigate(['admin/list']);
          },
          (errorResponse: HttpErrorResponse) => {
            if (errorResponse.status === 401) {
              this.errorCredentials = false;
            }
          }
        );
      }
    }, 1500 );


  }

  paramsChange(id) {

  }

}


