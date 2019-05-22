import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GeneroService } from '../../genero.service';
import { CdsService } from '../../cd.service';
import { Genero } from '../../shared/generos.model';
import { Artista } from '../../shared/artista.model';
import { environment } from '../../../environments/environment';
import { Cds } from '../../shared/cds.model';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {

  public formulario: FormGroup;
  public generoCds: Genero;
  public artistaCds: Artista;
  public errorCredentials: false;
  public id: string;
  public cds: Cds;
  public pronto = false;
  /**
   * Mostrando dados do Cd ex: todos os seus artitas e Generos
   */

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
    private router: Router, private generoService: GeneroService, private cdsService: CdsService) {


   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
      console.log('parametros : ', this.id);

    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });



    /**
     * rotas para pegar generos e artisdas os que ja estão no cd
     */
    this.http.get<Cds>(`${environment.api_url}/admin/cds/${this.id}`).subscribe(data => {
      this.cds = data;
      this.pronto = true;
      console.log(this.cds);
    });
    this.http.get<Genero>(`${environment.api_url}/admin/cds/allGeneros/${this.id}`).subscribe(data => {
      this.generoCds = data;
      console.log(this.generoCds);
    });

    this.http.get<Artista>(`${environment.api_url}/admin/cds/allArtistas/${this.id}`).subscribe(data => {
      this.artistaCds = data;
      console.log(this.artistaCds);
    });

  }

}
