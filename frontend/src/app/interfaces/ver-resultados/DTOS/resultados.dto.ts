import { PreguntaResultadoDTO } from './pregunta-resultado.dto';

export interface ResultadosDTO {
    id: number;
    encuestaId: number;
    codigoResultados: string;
    totalRespuestas: number;
    preguntas: PreguntaResultadoDTO[];
} 