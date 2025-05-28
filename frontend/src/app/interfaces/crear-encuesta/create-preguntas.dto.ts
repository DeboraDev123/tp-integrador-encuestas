import { CreateOpcionesDTO } from "./create-opciones.dto";
import { PreguntaDTO } from "./DTOS/pregunta.dto";


export interface CreatePreguntaDTO extends 
Pick< PreguntaDTO, 'numero' | 'texto' | 'tipo'>{
    opciones: CreateOpcionesDTO[];
}