import { PreguntaResultadoDTO } from './DTOS/pregunta-resultado.dto';
import { CreateRespuestaDTO } from './create-respuesta.dto';

export interface CreatePreguntaResultadoDTO extends Pick<PreguntaResultadoDTO, 'numero' | 'texto' | 'tipo'> {
    respuestas: CreateRespuestaDTO[];
} 