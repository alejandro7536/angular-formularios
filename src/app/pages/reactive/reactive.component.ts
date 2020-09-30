import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarData();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }
  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }
  get ciudadNoValida() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  get pass1NoValida(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }
  get pass2NoValida(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }



  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrea]], // Solo se manda la referencia a la fiuncionm, no se ejecuta con los ()
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });

  }

  cargarData() {
    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Alejandro',
      apellido: 'Alas',
      correo: 'alejandroalas7536@gmail.com',
      direccion: {
        distrito: 'Chalatenango',
        ciudad: 'Santa Rita'
      }
    }
      );
  }

  crearListeners() {
    // this.forma.valueChanges.subscribe(valor => {
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe(console.log);
    this.forma.get('nombre').valueChanges.subscribe(console.log);

  }

  agregar() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());

        } else {
          control.markAsTouched();

        }

      });
    }



    // Posteo de la informacion
    this.forma.reset();
  }


}
