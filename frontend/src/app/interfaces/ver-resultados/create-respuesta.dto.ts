import { RespuestaDTO } from './DTOS/respuesta.dto';

export interface CreateRespuestaDTO extends Pick<RespuestaDTO, 'preguntaId' | 'respuesta'> {
    fecha?: Date;
} 