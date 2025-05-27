import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {
  private apiUrl = `${environment.apiUrl}/encuestas`;

  constructor(private http: HttpClient) { }

  crearEncuesta(encuesta: any): Observable<any> {
    return this.http.post(this.apiUrl, encuesta);
  }

  obtenerEncuestaParaResponder(id: number, codigo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/participar?codigo=${codigo}`);
  }

  obtenerEncuestaParaResultados(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${token}/ver-resultados`);
  }

  obtenerEncuesta(id: number, codigo: string, tipo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}?codigo=${codigo}&tipo=${tipo}`);
  }

  modificarEncuesta(encuesta: any): Observable<any> {
    return this.http.put(this.apiUrl, encuesta);
  }

  eliminarEncuesta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  obtenerTodasLasEncuestas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener/todas`);
  }
}
