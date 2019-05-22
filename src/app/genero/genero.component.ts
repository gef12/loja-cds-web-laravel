import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneroService } from '../genero.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private generoService: GeneroService,
    private router: Router) { }

  public formulario: FormGroup;
  errorCredentials = false;

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }
  onSubmit() {
    this.generoService.cadastroGenero(this.formulario.value).subscribe(
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
