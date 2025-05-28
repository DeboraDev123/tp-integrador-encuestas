import { CodigoTipoEnum } from "../../../enums/tipoRespuesta";

export interface ObtenerEncuestaParams {
    id: number;
    codigo: string;
    codigoTipo: CodigoTipoEnum;
  }