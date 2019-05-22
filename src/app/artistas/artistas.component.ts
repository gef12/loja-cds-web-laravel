import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtistaService } from '../artista.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent implements OnInit {

  /**
   * Componente Do artista
   * @param formBuilder
   * @param artistaService
   * @param router
   */

  constructor(private formBuilder: FormBuilder, private artistaService: ArtistaService,
    private router: Router) { }

  public formulario: FormGroup;
  errorCredentials = false;

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  /**
   * Cadastrando artista e encaminhado para Listando artistas
   */
  onSubmit() {
    this.artistaService.cadastroArtista(this.formulario.value).subscribe(
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
