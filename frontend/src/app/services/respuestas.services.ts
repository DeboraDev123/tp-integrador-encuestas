import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ObtenerEncuestaResponse } from '../interfaces/obtener-encuesta/obtener-encuesta.dto';
import { CodigoTipoEnum } from '../enums/tipoRespuesta';
import { CreateRespuestaDTO } from '../interfaces/crear-respuesta/create-respuesta.dto';

@Injectable({ providedIn: 'root'})
export class RespuestasServices {
  private httpClient = inject(HttpClient);



    obtenerEncuestas(
      id: number,
      codigo: string,
      codigoTipo: CodigoTipoEnum
    ): Observable<ObtenerEncuestaResponse> {  
      // Los otros van como query params
      const params = new HttpParams()
        .set('codigo', codigo)
        .set('tipo', codigoTipo);
      return this.httpClient.get<ObtenerEncuestaResponse>(`api/v1/encuestas/${id}`, { params });
    }


    crearRespuestas(id: number, dto: CreateRespuestaDTO): Observable<any>{
      return this.httpClient.post(
        `api/v1/respuestas/${id}`, dto.respuestas );
    }
    


}
