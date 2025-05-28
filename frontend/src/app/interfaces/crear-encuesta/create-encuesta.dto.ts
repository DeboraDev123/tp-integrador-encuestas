import { CreatePreguntaDTO } from "./create-preguntas.dto";
import { EncuestaDTO } from "./DTOS/encuesta.dto";


export interface CreateEncuestaDTO extends Pick<EncuestaDTO, 'nombre'>{
    preguntas: CreatePreguntaDTO[];
}