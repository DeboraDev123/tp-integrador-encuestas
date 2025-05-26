import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestasService } from '../../services/encuestas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ver-resultados',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './ver-resultados.component.html',
  styleUrl: './ver-resultados.component.css'
})
export class VerResultadosComponent implements OnInit {
  encuesta: any;
  loading: boolean = true;
  totalRespuestas: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encuestasService: EncuestasService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.params['codigo'];

    this.encuestasService.obtenerEncuestaParaResultados(token).subscribe({
      next: (encuesta) => {
        this.encuesta = encuesta;
        this.calcularTotalRespuestas();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar los resultados:', error);
        this.toastr.error('Error al cargar los resultados', 'Error');
        this.router.navigate(['/']);
      }
    });
  }

  private calcularTotalRespuestas() {
    if (this.encuesta && this.encuesta.preguntas && this.encuesta.preguntas.length > 0) {
      const primeraPregunta = this.encuesta.preguntas[0];
      this.totalRespuestas = this.getRespuestasPorPregunta(primeraPregunta.id).length;
    }
  }

  getRespuestasPorPregunta(preguntaId: number) {
    if (!this.encuesta.respuestas || !Array.isArray(this.encuesta.respuestas)) {
      return [];
    }
    return this.encuesta.respuestas.filter((r: any) => r.preguntaId === preguntaId);
  }

  getPorcentajeOpcion(preguntaId: number, opcionTexto: string): number {
    const respuestas = this.getRespuestasPorPregunta(preguntaId);
    const total = respuestas.length;
    if (total === 0) return 0;
    const count = respuestas.filter((r: any) => r.respuesta === opcionTexto).length;
    return (count / total) * 100;
  }

  getRespuestasAbiertas(preguntaId: number): string[] {
    return this.getRespuestasPorPregunta(preguntaId).map((r: any) => String(r.respuesta));
  }

  getOpcionesUnicas(preguntaId: number): string[] {
    const respuestas = this.getRespuestasPorPregunta(preguntaId);
    return [...new Set(respuestas.map((r: any) => String(r.respuesta)))] as string[];
  }
} 