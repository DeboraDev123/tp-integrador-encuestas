import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestasServices } from '../../services/respuestas.services';
// import { ToastrService } from 'ngx-toastr';

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
  encuestaForm: FormGroup;
  encuesta: any;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private encuestasService: RespuestasServices,
    // private toastr: ToastrService
  ) {
    this.encuestaForm = this.fb.group({
      respuestas: this.fb.array([])
    });
  }

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
        // this.toastr.error('Error al cargar la encuesta', 'Error');
        this.router.navigate(['/']);
      }
    });
  }

  get respuestas() {
    return this.encuestaForm.get('respuestas') as FormArray;
  }

  private inicializarFormulario() {
    this.encuesta.preguntas.forEach((pregunta: any) => {
      const respuestaForm = this.fb.group({
        preguntaId: [pregunta.id],
        respuesta: ['', Validators.required]
      });
      this.respuestas.push(respuestaForm);
    });
  }

  onSubmit() {
    // Método vacío para evitar error de compilación
  }
} 