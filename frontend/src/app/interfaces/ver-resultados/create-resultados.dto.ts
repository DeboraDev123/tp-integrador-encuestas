import { ResultadosDTO } from './DTOS/resultados.dto';
import { CreatePreguntaResultadoDTO } from './create-pregunta-resultado.dto';

export interface CreateResultadosDTO extends Pick<ResultadosDTO, 'encuestaId' | 'codigoResultados'> {
    totalRespuestas: number;
    preguntas: CreatePreguntaResultadoDTO[];
} 