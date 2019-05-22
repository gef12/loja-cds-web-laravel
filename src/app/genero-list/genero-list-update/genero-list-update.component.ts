import { Component, OnInit, Input } from '@angular/core';
import { Genero } from '../../shared/generos.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeneroService } from '../../genero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-genero-list-update',
  templateUrl: './genero-list-update.component.html',
  styleUrls: ['./genero-list-update.component.css']
})

/**
 * Realiza o Update do Genero;
 */
export class GeneroListUpdateComponent implements OnInit {

  public formulario: FormGroup;
  errorCredentials = false;
  public genero: Genero;

  public name: string;

  @Input() public id: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private generoService: GeneroService,
    private router: Router, private route: ActivatedRoute) {

      this.id = this.route.snapshot.params['id'];
      console.log('parametros : ', this.id);
    }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });

    this.http.get<Genero>(`${environment.api_url}/admin/genero/${this.id}`).subscribe(data => {
      this.genero = data;
      this.name = data.name;
      console.log(this.genero);
    });
  }

  onSubmit() {
    this.generoService.updateGenero(this.formulario.value, this.id ).subscribe(
      (resp) => {
        this.router.navigate(['admin/generosList']);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
      }
    );
  }

}
