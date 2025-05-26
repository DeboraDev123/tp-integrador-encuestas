import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EncuestasService } from '../../services/encuestas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enlaces-compartir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enlaces-compartir.component.html',
  styleUrl: './enlaces-compartir.component.css'
})
export class EnlacesCompartirComponent implements OnInit {
  enlaceRespuesta: string = '';
  enlaceResultados: string = '';

  constructor(
    private route: ActivatedRoute,
    private encuestasService: EncuestasService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const codigoRespuesta = this.route.snapshot.params['codigoRespuesta'];
    const codigoResultados = this.route.snapshot.params['codigoResultados'];

    if (id && codigoRespuesta && codigoResultados) {
      this.enlaceRespuesta = `${window.location.origin}/responder/${id}/${codigoRespuesta}`;
      this.enlaceResultados = `${window.location.origin}/resultados/${id}/${codigoResultados}`;
    }
  }

  copiarEnlace(enlace: string) {
    navigator.clipboard.writeText(enlace).then(() => {
      this.toastr.success('Enlace copiado al portapapeles', 'Éxito');
    }).catch(() => {
      this.toastr.error('Error al copiar el enlace', 'Error');
    });
  }
}
