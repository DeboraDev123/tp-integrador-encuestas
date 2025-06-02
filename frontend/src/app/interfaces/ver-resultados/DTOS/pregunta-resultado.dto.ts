import { TiposRespuestaEnum } from '../../../enums/tipoRespuesta';
import { RespuestaDTO } from './respuesta.dto';
import { OpcionResultadoDTO } from './opcion-resultado.dto';

export interface PreguntaResultadoDTO {
    id: number;
    numero: number;
    texto: string;
    tipo: TiposRespuestaEnum;
    opciones?: OpcionResultadoDTO[];
    respuestas: RespuestaDTO[];
} 