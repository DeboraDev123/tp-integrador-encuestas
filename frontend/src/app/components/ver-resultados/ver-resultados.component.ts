import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestasServices } from '../../services/respuestas.services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ver-resultados',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-resultados.component.html',
  styleUrls: ['./ver-resultados.component.css']
})
export class VerResultadosComponent implements OnInit {
  encuesta: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encuestasService: RespuestasServices,
    private toastr: ToastrService
  ) {}


  
  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    const codigo = this.route.snapshot.params['codigo'];
    const tipoStr = this.route.snapshot.params['tipo'];

    this.encuestasService.obtenerEncuestas(id, codigo, tipoStr).subscribe({
      next: (encuesta) => {
        this.encuesta = encuesta;
        console.log(this.encuesta);  
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar la encuesta:', error);
        this.router.navigate(['/']);
      }
    });
  }
}
