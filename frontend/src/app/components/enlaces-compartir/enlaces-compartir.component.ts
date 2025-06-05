import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-enlaces-compartir',
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './enlaces-compartir.component.html',
  styleUrl: './enlaces-compartir.component.css',
  providers: [MessageService],
})
export class EnlacesCompartirComponent {
  private router: Router = inject(Router);

  constructor(private route: ActivatedRoute,) {}
  idEncuesta: String = '';
  codigoRespuesta: String = '';
  codigoResultados: String = '';

  // RECUPERAR VALUE PARAMS
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    if (!params['idEncuesta']){
      Swal.fire({
        title: '¡Error!',
        text: 'Ocurrio un error al intentar crear la encuesta',
        icon: 'error',
      }).then(() => {
        this.router.navigate(['/error']);
      });
    }
    this.idEncuesta = params['idEncuesta'];
    this.codigoRespuesta = params['codigo-respuesta'];
    this.codigoResultados = params['codigo-resultados'];
    });
  }


  copiarAlPortapapeles(tipo: 'respuesta' | 'resultados'){
  const baseUrl = window.location.origin;
  const urlCompleta = tipo === 'respuesta'
    ? `${baseUrl}/responder/${this.idEncuesta}/${this.codigoRespuesta}/RESPUESTA`
    : `${baseUrl}/resultados/${this.idEncuesta}/${this.codigoResultados}/RESULTADOS`;

  navigator.clipboard.writeText(urlCompleta).then(() => {
    // Mensaje de éxito
    Swal.fire({
      title: '¡Copiado!',
      text: 'El enlace fue copiado al portapapeles',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
    // console.log('URL copiada:', urlCompleta);
  });
  }

}