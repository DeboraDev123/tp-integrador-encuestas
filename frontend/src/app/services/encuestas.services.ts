import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CreateEncuestaDTO } from "../interfaces/crear-encuesta/create-encuesta.dto";
import { ObtenerEncuestaResponse } from '../interfaces/obtener-encuesta/obtener-encuesta.dto';
import { CodigoTipoEnum } from '../enums/tipoRespuesta';

@Injectable({ providedIn: 'root'})
export class EncuestasService {
  private httpClient = inject(HttpClient);

  crearEncuesta(dto: CreateEncuestaDTO): Observable<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }>{
    return this.httpClient.post<{
        id: number;
        codigoRespuesta: string;
        codigoResultados: string;
        }>("/api/v1/encuestas", dto);
    }

    // AGREGAR AQUI LOS OTROS METODOS DE LA API

    
    




  }

  // crearEncuesta(encuesta: any): Observable<any> {
  //   return this.http.post(this.apiUrl, encuesta);
  // }

  // CORREGIR URGENTE!

  // obtenerEncuestaParaResponder(id: number, codigo: string): Observable<any> {

  //   return this.http.get(`${this.apiUrl}/${id}/participar?codigo=${codigo}`);
  // }

  // obtenerEncuestaParaResultados(token: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${token}/ver-resultados`);
  // }

  // obtenerEncuesta(id: number, codigo: string, tipo: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${id}?codigo=${codigo}&tipo=${tipo}`);
  // }

  // modificarEncuesta(encuesta: any): Observable<any> {
  //   return this.http.put(this.apiUrl, encuesta);
  // }

  // eliminarEncuesta(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  // }

  // obtenerTodasLasEncuestas(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/obtener/todas`);
  // }
