import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Alejandro',
    apellido: 'Gonzalez',
    correo: 'alejandroalas7536@gmail.com',
    pais: 'SLV',
    genero: ''

  };

  paises: any[] = [];

  constructor(
    private paisService: PaisService

  ) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(
      paises => {
        this.paises = paises;
        this.paises.unshift({
          nombre: 'Seleccione un pais',
          codigo: ''
        });
      }
    );
  }

  guardar(f: NgForm) {

    if (f.invalid) {
      Object.values(f.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }
    console.log(f);
    console.log(f.value);

  }

}
