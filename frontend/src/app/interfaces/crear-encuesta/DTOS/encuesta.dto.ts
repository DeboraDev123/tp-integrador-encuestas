import { PreguntaDTO  } from './pregunta.dto';


export interface EncuestaDTO {
    id: number;
    nombre: string;
    codigoRespuesta: string;
    codigoResultados: string;


    preguntas: PreguntaDTO[];
}