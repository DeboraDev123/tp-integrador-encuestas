import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {
  private apiUrl = 'http://localhost:3000/api/v1/encuestas';

  constructor(private http: HttpClient) { }

  crearEncuesta(encuesta: any): Observable<any> {
    return this.http.post(this.apiUrl, encuesta);
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
}
