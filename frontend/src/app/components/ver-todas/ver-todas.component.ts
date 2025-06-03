import { Component, OnInit,inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EncuestasService } from '../../services/encuestas.services';
import { EncuestaDTO } from '../../interfaces/crear-encuesta/DTOS/encuesta.dto';
import { FooterComponent } from "../footer/footer.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-todas',
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule,
  FooterComponent],
  templateUrl: './ver-todas.component.html',
  styleUrls: ['./ver-todas.component.css']
})
export class VerTodasComponent implements OnInit{
  encuestaForm: FormGroup;
  step: number = 1;
  encuestas: EncuestaDTO[] = [];
  enlaceRespuesta: string | null = null;
  enlaceResultados: string | null = null;
  private encuestasService : EncuestasService = inject(EncuestasService)

  constructor(
    private fb: FormBuilder,
  ) {
    this.encuestaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      preguntas: this.fb.array([]),
    });
  }

  idEncuesta: String = '';
  codigoRespuesta: String = '';
  codigoResultados: String = '';
  
  ngOnInit(): void {
    console.log('Componente cargado!');
    this.encuestasService.obtenerTodasLasEncuestas().subscribe({
      next: (data) => {
        this.encuestas = data;
        console.log(this.encuestas); // Para ver el array recibido
      },
      error: (error) => {
        console.error('Error al crear la encuesta:', error);
        alert('Error al crear la encuesta');
      }
    });
  }
  
  
  eliminarEncuesta(encuesta: EncuestaDTO) {
    console.log('Eliminar', encuesta);
    this.encuestasService.eliminarEncuesta(encuesta.id).subscribe(() => {
      console.log('Encuesta eliminada');
      // Podés actualizar la lista después de eliminar:
      Swal.fire({
                title: '¡Encuesta eliminada!',
                text: 'Encuesta eliminada con éxito',
                icon: 'success',
              });
      this.encuestas = this.encuestas.filter(e => e.id !== encuesta.id);
    });
  }
}

