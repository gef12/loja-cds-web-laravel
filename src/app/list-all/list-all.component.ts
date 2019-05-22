import { Component, OnInit } from '@angular/core';
import { Cds } from '../shared/cds.model';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CdsService } from '../cd.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Artista } from '../shared/artista.model';
import { Genero } from '../shared/generos.model';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {

  public cds: Cds;
  public formulario: FormGroup;
  public artistas: Artista;
  public generos: Genero;
  public ultimo; any;
  public errorCredentials: false;
  public mostrar = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router,  private cdsService: CdsService, private http: HttpClient) { }

  ngOnInit() {

    /**
     * Carregado dados para mostrar Lista De Cds e suas opções
     */
    let var1: Array<any>;
    let var2: Array<any>;

    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
    this.http.get<Cds>(`${environment.api_url}/admin/cds/busca/ultimo`).subscribe(data => {
      this.ultimo = data[0];
    });

    this.http.get<Cds>(`${environment.api_url}/admin/cds`).subscribe(data => {
      this.cds = data;
    });

    /**
     * Encadeando respostas
     */
    if (parseInt(this.cdsService.valorCd, 10 ) !== 0) {

    setTimeout( () => {

    this.http.get<any>(`${environment.api_url}/admin/cds/artista/${this.cdsService.valorCd}`).subscribe(data => {
      var1 = data;
      console.log('var 1', var1);
    });

    this.http.get<any>(`${environment.api_url}/admin/cds/genero/${this.cdsService.valorCd}`).subscribe(data => {
      var2 = data;
      console.log('var 2', var2);
    });
    }, 2500 );

    setTimeout( () => {

      if (var1.length !== 0  && var2.length !== 0) {
        this.mostrar = false;
        this.cdsService.valorCd = '0';
      } else {
        this.mostrar = true;
        setTimeout( () => {
            this.cdsService.deleteCds(this.formulario.value, this.cdsService.valorCd ).subscribe(
              (resp) => {
                this.cdsService.valorCd = '0';
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                this.router.navigate(['admin/list']));
              },
              (errorResponse: HttpErrorResponse) => {
                this.mostrar = false;
                if (errorResponse.status === 401) {
                  this.errorCredentials = false;
                }
              }
            );
        }, 1500);
      }
    }, 4500 );
  } else {
    this.cdsService.valorCd = '0';
  }

    /**
    this.http.get<Genero>(`${environment.api_url}/admin/cds/allGeneros`).subscribe(data => {
      this.generos = data;
      console.log(this.generos);
    });
    this.http.get<Artista>(`${environment.api_url}/admin/cds/allArtistas`).subscribe(data => {
      this.artistas = data;
      console.log(this.artistas);
    });
    */
  }
  /**
   * Deletando Cd e redirecionando para a mesma tela
   */
  deletarCds(id) {

    this.cdsService.deleteCds(this.formulario.value, id ).subscribe(
      (resp) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['admin/list']));
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = false;
        }
      }
    );
  }

}
