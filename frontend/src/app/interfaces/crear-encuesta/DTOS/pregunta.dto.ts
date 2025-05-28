import { TiposRespuestaEnum } from "../../../enums/tipoRespuesta";
import { OpcionesDTO } from "./opciones.dto";


export interface PreguntaDTO {
    id: number;
    numero: number;
    texto: string;
    tipo: TiposRespuestaEnum

    opciones?: OpcionesDTO[];
}