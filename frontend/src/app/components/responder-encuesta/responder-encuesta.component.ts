import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestasServices } from '../../services/respuestas.services';
import { MessageService } from 'primeng/api';
import { CreateEncuestaDTO } from '../../interfaces/crear-encuesta/create-encuesta.dto';
// import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-responder-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.css']
})
export class ResponderEncuestaComponent implements OnInit {
  private messageService: MessageService = inject(MessageService);
  encuestaForm: FormGroup;
  encuesta: any;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private encuestasService: RespuestasServices,
  ) {
    this.encuestaForm = this.fb.group({
      respuestas: this.fb.array([])
    });
  }


  get respuestas() {
    return this.encuestaForm.get('respuestas') as FormArray;
  }

  private inicializarFormulario() {
    this.encuesta.preguntas.forEach((pregunta: any) => {
      const respuestaForm = this.fb.group({
        idPregunta: [pregunta.id],
        tipo: [pregunta.tipo],
        respuesta: this.fb.control([])
      });
      this.respuestas.push(respuestaForm);
    });
  }

  // CHECKBOX 
  onCheckboxChange(event: any, preguntaIndex: number, valor: string) {
    const respuestaFormGroup = this.respuestas.at(preguntaIndex);
    const respuestaActual = respuestaFormGroup.get('respuesta')?.value || [];
  
    if (event.target.checked) {
      respuestaActual.push(valor);
    } else {
      const index = respuestaActual.indexOf(valor);
      if (index >= 0) {
        respuestaActual.splice(index, 1);
      }
    }
    respuestaFormGroup.get('respuesta')?.setValue(respuestaActual);
    respuestaFormGroup.get('respuesta')?.markAsTouched();
  }


  respuestaSeleccionada(preguntaIndex: number, valor: number): boolean {
  const respuesta = this.respuestas.at(preguntaIndex).get('respuesta')?.value || [];
  return respuesta.includes(valor);  }

  

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    const codigo = this.route.snapshot.params['codigo'];
    const tipoStr = this.route.snapshot.params['tipo'];

    this.encuestasService.obtenerEncuestas(id, codigo, tipoStr).subscribe({
      next: (encuesta) => {
        this.encuesta = encuesta;
        this.inicializarFormulario();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar la encuesta:', error);
        this.router.navigate(['/']);
      }
    });
  }


  onSubmit() {
    if (!this.encuestaForm.valid) {
      this.encuestaForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hay errores en el formulario',
      });
      return;
    }

    const respuestasFormateadas = this.respuestas.value.map((r: any) => {
      if (r.tipo === 'ABIERTA') {
        return {
          idPregunta: r.idPregunta,
          tipo: r.tipo,
          texto: r.respuesta
        };
      } else {
        return {
          idPregunta: r.idPregunta,
          tipo: 'OPCION',
          idOpcion: Array.isArray(r.respuesta) && r.respuesta.length === 1
            ? r.respuesta[0]
            : r.respuesta
        };
      }
    });
    
    this.encuestasService.crearRespuestas(this.encuesta.id, {respuestas: respuestasFormateadas}).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Encuesta respondida con éxito',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: (error) => {
        console.error('Error al enviar la encuesta', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error al responder la encuesta. Intenta de nuevo mas tarde.',
        });
        Swal.fire({
          title: '¡Error!',
          text: 'Ocurrio un error al intentar crear la encuesta',
          icon: 'error',
        }).then(() => {
          this.router.navigate(['/'])
        });
      }
    });
    }


}