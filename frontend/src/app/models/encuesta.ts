export interface Pregunta {
  id?: number;
  texto: string;
  tipo: 'ABIERTA' | 'OPCION';
  opciones?: Opcion[];
}

export interface Opcion {
  id?: number;
  texto: string;
}

export interface Encuesta {
  id?: number;
  titulo: string;
  descripcion: string;
  preguntas: Pregunta[];
  codigoRespuesta?: string;
  codigoResultados?: string;
}

export interface EncuestaDos {
  id?: number;
  nombre: string;
  descripcion: string;
  preguntas: Pregunta[];
  codigoRespuesta?: string;
  codigoResultados?: string;
}
