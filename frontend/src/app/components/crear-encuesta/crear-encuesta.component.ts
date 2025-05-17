import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EncuestasService } from '../../services/encuestas.service';
import { Encuesta, Pregunta, Opcion } from '../../models/encuesta';

@Component({
  selector: 'app-crear-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.css']
})
export class CrearEncuestaComponent {
  encuestaForm: FormGroup;
  step: number = 1;
  enlaceRespuesta: string | null = null;
  enlaceResultados: string | null = null;

  constructor(
    private fb: FormBuilder,
    private encuestasService: EncuestasService
  ) {
    this.encuestaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      preguntas: this.fb.array([])
    });
  }

  get preguntas() {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  // Paso 1: Validar y avanzar
  continuar() {
    if (this.encuestaForm.get('titulo')?.valid && this.encuestaForm.get('descripcion')?.valid) {
      this.step = 2;
    } else {
      this.encuestaForm.get('titulo')?.markAsTouched();
      this.encuestaForm.get('descripcion')?.markAsTouched();
    }
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

  getOpciones(preguntaIndex: number) {
    return this.preguntas.at(preguntaIndex).get('opciones') as FormArray;
  }

  agregarOpcion(preguntaIndex: number) {
    const opciones = this.getOpciones(preguntaIndex);
    const opcionForm = this.fb.group({
      texto: ['', Validators.required]
    });
    opciones.push(opcionForm);
  }

  eliminarOpcion(preguntaIndex: number, opcionIndex: number) {
    const opciones = this.getOpciones(preguntaIndex);
    opciones.removeAt(opcionIndex);
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
      this.encuestasService.crearEncuesta(encuesta).subscribe({
        next: (response) => {
          this.enlaceRespuesta = window.location.origin + '/responder/' + response.codigoRespuesta;
          this.enlaceResultados = window.location.origin + '/resultados/' + response.codigoResultados;
          this.step = 3;
          this.encuestaForm.reset();
          this.preguntas.clear();
        },
        error: (error) => {
          console.error('Error al crear la encuesta:', error);
          alert('Error al crear la encuesta');
        }
      });
    }
  }

  copiarEnlace(enlace: string) {
    navigator.clipboard.writeText(enlace);
    alert('¡Enlace copiado!');
  }
}
