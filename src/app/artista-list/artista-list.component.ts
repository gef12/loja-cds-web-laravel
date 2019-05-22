import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Artista } from '../shared/artista.model';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistaService } from '../artista.service';
import { CdsService } from '../cd.service';

@Component({
  selector: 'app-artista-list',
  templateUrl: './artista-list.component.html',
  styleUrls: ['./artista-list.component.css']
})
export class ArtistaListComponent implements OnInit {

  public idArtista: string;
  inscricao: Subscription;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
    private router: Router, private artistaService: ArtistaService, private cdsService: CdsService) {

  }

  /**
   * Listando todos os artistas este componente e utilazado em varios outro componentes
   */

  public artista: Artista;
  public formulario: FormGroup;
  errorCredentials: boolean;

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });


    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idArtista = params['id'];
        console.log('Id antes :', this.idArtista);
      });
    this.http.get<Artista>(`${environment.api_url}/admin/artistas`).subscribe(data => {
      this.artista = data;
      console.log(this.artista);
    });
  }

  OnDestroy() {
    /**
     this.inscricao.unsubscribe();
     */
  }

  editarArtista(id) {

    console.log(id);
    this.router.navigate([`admin/artistasList/${id}`]);
  }

  deletarArtista(id) {

    this.artistaService.deleteArtista(this.formulario.value, id ).subscribe(
      (resp) => {
        this.verificarCdsSemArtista();
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['admin/artistasList']));
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
      }
    );
  }

    verificarCdsSemArtista() {
      let var1: Array<any>;
      this.http.get<any>(`${environment.api_url}/admin/cds/delete/cdsSemArtistas`).subscribe(data => {
        this.cdsService.buscandoDeleteCds = data;
        var1 = data;
      });

      setTimeout( () => {
        if ( var1.length !== 0) {
          this.cdsService.deleteCds(this.formulario.value, this.cdsService.buscandoDeleteCds[0].id ).subscribe(
            (resp) => {
              console.log('cd deletado por nõa ter artista', this.cdsService.buscandoDeleteCds[0].id);
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
