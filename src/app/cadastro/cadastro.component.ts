import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CdsService } from '../cd.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  /**
   * Cadastro de Cds onde o mesmo ira ser redirecionado para a tela de inserção de artistas e generos.
   */

  public formulario: FormGroup;
  public errorCredentials = false;
  public id;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router,  private cdsService: CdsService) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.cdsService.cadastroCds(this.formulario.value).subscribe(
      (resp) => {
        console.log(resp);
        this.id =  resp['id'];
        console.log(this.id);
        this.router.navigate([`admin/cadastroProx/${this.id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
      }
    );
  }

}
