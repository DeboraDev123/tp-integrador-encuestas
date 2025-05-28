import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { EncuestasService } from '../../services/crearPreguntas.service';
import { Encuesta, Pregunta, Opcion,EncuestaDos } from '../../models/encuesta';

@Component({
  selector: 'app-ver-todas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ver-todas.component.html',
  styleUrls: ['./ver-todas.component.css']
})
export class VerTodasComponent implements OnInit{
  encuestaForm: FormGroup;
  step: number = 1;
  encuestas: EncuestaDos[] = [];
  enlaceRespuesta: string | null = null;
  enlaceResultados: string | null = null;

  constructor(
    private fb: FormBuilder,
    // private encuestasService: EncuestasService
  ) {
    this.encuestaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      preguntas: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    console.log('Componente cargado!');
    // this.encuestasService.obtenerTodasLasEncuestas().subscribe({
    //   next: (data) => {
    //     this.encuestas = data;
    //     console.log(this.encuestas); // Para ver el array recibido
    //   },
    //   error: (error) => {
    //     console.error('Error al crear la encuesta:', error);
    //     alert('Error al crear la encuesta');
    //   }
    // });
  }
  
  // productos = [
  //   { nombre: 'Producto 1', descripcion: 'Descripción 1' },
  //   { nombre: 'Producto 2', descripcion: 'Descripción 2' },
  //   { nombre: 'Producto 3', descripcion: 'Descripción 3' },
  //   { nombre: 'Producto 4', descripcion: 'Descripción 4' }
  // ];

  editarProducto(producto: any) {
    console.log('Editar', producto);
    // Lógica para editar el producto
  }
  
  eliminarProducto(producto: any) {
    console.log('Eliminar', producto);
    // Lógica para eliminar el producto
  }
  continuar() {
    if (this.encuestaForm.get('titulo')?.valid && this.encuestaForm.get('descripcion')?.valid) {
      this.step = 2;
    } 
  }
}

