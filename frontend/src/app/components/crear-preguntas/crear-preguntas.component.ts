import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-preguntas',
  imports: [
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './crear-preguntas.component.html',
  styleUrl: './crear-preguntas.component.css'
})
export class CrearPreguntasComponent {

  constructor(private fb: FormBuilder) {
    this.encuestaForm = this.fb.group({
      titulo: ['', Validators.required],
      // descripcion: ['', Validators.required],
      preguntas: this.fb.array([])
    });
  }

  step: number = 1;
  encuestaForm: FormGroup;


  get preguntas() {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  continuar() {
    // && this.encuestaForm.get('descripcion')?.valid
    if (this.encuestaForm.get('titulo')?.valid) {
      this.step = 2;
    } else {
      this.encuestaForm.get('titulo')?.markAsTouched();
      // this.encuestaForm.get('descripcion')?.markAsTouched();
    }
  }

  agregarOpcion(preguntaIndex: number) {
    const opciones = this.getOpciones(preguntaIndex);
    const opcionForm = this.fb.group({
      texto: ['', Validators.required]
    });
    opciones.push(opcionForm);
  }

  agregarPregunta() {
    const preguntaForm = this.fb.group({
      texto: ['', Validators.required],
      tipo: ['ABIERTA', Validators.required],
      opciones: this.fb.array([])
    });
    this.preguntas.push(preguntaForm);
  }

  eliminarPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  eliminarOpcion(preguntaIndex: number, opcionIndex: number) {
    const opciones = this.getOpciones(preguntaIndex);
    opciones.removeAt(opcionIndex);
  }

  getOpciones(preguntaIndex: number) {
    return this.preguntas.at(preguntaIndex).get('opciones') as FormArray;
  }

  onSubmit() {
    if (this.encuestaForm.valid && this.preguntas.length > 0) {
      const formValue = this.encuestaForm.value;
      const preguntasConNumero = formValue.preguntas.map((pregunta: any, index: number) => {
        const preguntaFinal: any = {
          ...pregunta,
          numero: index + 1,
          tipo: pregunta.tipo === 'OPCION' ? 'OPCION' : 'ABIERTA',
        };
        if (pregunta.tipo === 'OPCION' && pregunta.opciones && pregunta.opciones.length > 0) {
          preguntaFinal.opciones = pregunta.opciones.map((opcion: any, idx: number) => ({
            ...opcion,
            numero: idx + 1
          }));
        } else {
          delete preguntaFinal.opciones;
        }
        return preguntaFinal;
      });
      const encuesta = {
        nombre: formValue.titulo,
        preguntas: preguntasConNumero
      };
      // this.encuestasService.crearEncuesta(encuesta).subscribe({
      //   next: (response) => {
      //     this.enlaceRespuesta = window.location.origin + '/responder/' + response.codigoRespuesta;
      //     this.enlaceResultados = window.location.origin + '/resultados/' + response.codigoResultados;
      //     this.step = 3;
      //     this.encuestaForm.reset();
      //     this.preguntas.clear();
      //   },
      //   ,
      //   error: (error) => {
      //     console.error('Error al crear la encuesta:', error);
      //     alert('Error al crear la encuesta');
      //   }
      // });
    }
  }

}
