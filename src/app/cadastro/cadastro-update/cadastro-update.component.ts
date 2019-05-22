import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CdsService } from '../../cd.service';
import { Cds } from '../../shared/cds.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cadastro-update',
  templateUrl: './cadastro-update.component.html',
  styleUrls: ['./cadastro-update.component.css']
})
export class CadastroUpdateComponent implements OnInit {

  public id: string;
    public cds: Cds;
    public formulario: FormGroup;
    public errorCredentials: true;
    public name: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private cdsService: CdsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('parametros : ', this.id);

  this.formulario = this.formBuilder.group({
    name: [null, [Validators.required]]
  });

  this.http.get<Cds>(`${environment.api_url}/admin/cds/${this.id}`).subscribe(data => {
    this.cds = data;
    this.name = data.name;
    console.log(this.cds);
  });
  }

  onSubmit() {
    this.cdsService.updateCds(this.formulario.value, this.id ).subscribe(
      (resp) => {
        this.router.navigate(['admin/list']);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
      }
    );
  }

}
