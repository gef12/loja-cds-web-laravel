import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Genero } from '../shared/generos.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneroService } from '../genero.service';
import { CdsService } from '../cd.service';

@Component({
  selector: 'app-genero-list',
  templateUrl: './genero-list.component.html',
  styleUrls: ['./genero-list.component.css']
})
export class GeneroListComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private generoService: GeneroService, private cdsService: CdsService) { }

  public genero: Genero;
  public formulario: FormGroup;
  errorCredentials: boolean;

  /**
   * Listando os generos e suas opçoes delete e edit
   */

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
    this.http.get<Genero>(`${environment.api_url}/admin/genero`).subscribe(data => {
      this.genero = data;
      console.log(this.genero);
    });
  }

  editarGenero(id) {

    console.log(id);
    this.router.navigate([`admin/generosList/${id}`]);
  }

  deletarGenero(id) {

    this.generoService.deleteGenero(this.formulario.value, id ).subscribe(
      (resp) => {
        this.verificarCdsSemGenero();
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['admin/generosList']));
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = false;
        }
      }
    );
  }


    verificarCdsSemGenero() {
      let var1: Array<any>;
      this.http.get<any>(`${environment.api_url}/admin/cds/delete/cdsSemGeneros`).subscribe(data => {
        this.cdsService.buscandoDeleteCds = data;
        var1 = data;
      });


      setTimeout( () => {
        if ( var1.length !== 0) {
          this.cdsService.deleteCds(this.formulario.value, this.cdsService.buscandoDeleteCds[0].id ).subscribe(
            (resp) => {
              console.log();
            },
            (errorResponse: HttpErrorResponse) => {
              if (errorResponse.status === 401) {
                this.errorCredentials = false;
              }
            }
          );
        }
      }, 2000);
    }

}
