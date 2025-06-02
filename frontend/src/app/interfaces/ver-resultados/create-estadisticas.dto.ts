import { EstadisticasDTO } from './DTOS/estadisticas.dto';

export interface CreateEstadisticasDTO extends Pick<EstadisticasDTO, 'preguntaId' | 'opcionId'> {
    porcentaje: number;
    cantidad: number;
    totalRespuestas: number;
} 