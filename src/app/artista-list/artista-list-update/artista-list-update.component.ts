import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Artista } from '../../shared/artista.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistaService } from '../../artista.service';


@Component({
  selector: 'app-artista-list-update',
  templateUrl: './artista-list-update.component.html',
  styleUrls: ['./artista-list-update.component.css']
})
export class ArtistaListUpdateComponent implements OnInit {

  public formulario: FormGroup;
  errorCredentials: boolean;
  public artista: Artista;

  public name: string;

  @Input() public id: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private artistaService: ArtistaService,
    private router: Router, private route: ActivatedRoute) {
      this.id = this.route.snapshot.params['id'];
      console.log('parametros : ', this.id);
     }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });

    this.http.get<Artista>(`${environment.api_url}/admin/artistas/${this.id}`).subscribe(data => {
      this.artista = data;
      this.name = data.name;
      console.log(this.artista);
    });
  }

  onSubmit() {
    this.artistaService.updateArtista(this.formulario.value, this.id ).subscribe(
      (resp) => {
        this.router.navigate(['admin/artistasList']);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
      }
    );
  }

}
