import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { tiposPreguntaPresentacion } from '../../enums/tipoRespuesta';
import { CreateEncuestaDTO } from '../../interfaces/crear-encuesta/create-encuesta.dto';
import { EncuestasService } from '../../services/encuestas.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-crear-preguntas',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // HeaderComponent,
    FooterComponent
],
  templateUrl: './crear-preguntas.component.html',
  styleUrl: './crear-preguntas.component.css'
})
export class CrearPreguntasComponent {
  tiposPregunta = tiposPreguntaPresentacion
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private encuestasService : EncuestasService = inject(EncuestasService)

  constructor(private fb: FormBuilder) {

    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      preguntas: this.fb.array([])
    });
  }

  step: number = 1;
  encuestaForm: FormGroup;

  get preguntas() {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  continuar() {
    if (this.encuestaForm.get('nombre')?.valid) {
      this.step = 2;
    } else {
      this.encuestaForm.get('nombre')?.markAsTouched();
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

    // Suscribirse a cambios en el tipo de pregunta
    preguntaForm.get('tipo')?.valueChanges.subscribe((tipo) => {
      const opciones = preguntaForm.get('opciones') as FormArray;
      opciones.clear();
      if (tipo === 'VERDADERO_FALSO') {
        opciones.push(this.fb.group({ texto: 'Verdadero' }));
        opciones.push(this.fb.group({ texto: 'Falso' }));
      }
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
    // console.log('OnSubmit LLamado', this.encuestaForm)
    if (!this.encuestaForm.valid) {
      this.encuestaForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hay errores en el formulario',
      });
      return;
    }
    const encuesta: CreateEncuestaDTO = this.encuestaForm.value;
    for (let i = 0; i < encuesta.preguntas.length; i++) {
      const pregunta = encuesta.preguntas[i];
      pregunta.numero = i + 1;

      if (pregunta.opciones) {
        for (let j = 0; j < pregunta.opciones.length; j++) {
          pregunta.opciones[j].numero = j + 1;
        }
      }
    }
    this.encuestasService.crearEncuesta(encuesta).subscribe({
      next: (res) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Encuesta creada con éxito',
          icon: 'success',
        });
        

        this.router.navigateByUrl(
          '/enlaces?idEncuesta=' +
            res.id +
            '&codigo-respuesta=' +
            res.codigoRespuesta +
            '&codigo-resultados=' +
            res.codigoResultados
        );
      },
      error: (err) => {
        // console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Ha ocurrido un error al crear la encuesta',
        });
        Swal.fire({
          title: '¡Error!',
          text: 'Ocurrio un error al intentar crear la encuesta',
          icon: 'error',
        }).then(() => {
          this.router.navigate(['/'])
        });
      },
      });
  }

}
