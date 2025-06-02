export enum TiposRespuestaEnum {
    ABIERTA = 'ABIERTA',
    OPCION_MULTIPLE_SELECCION_SIMPLE = 'OPCION_MULTIPLE_SELECCION_SIMPLE',
    OPCION_MULTIPLE_SELECCION_MULTIPLE = 'OPCION_MULTIPLE_SELECCION_MULTIPLE',
    VERDADERO_FALSO = 'VERDADERO_FALSO'
}

export enum CodigoTipoEnum {
    RESULTADOS = 'RESULTADOS',
    RESPUESTA = 'RESPUESTA',
  }  


export const tiposPreguntaPresentacion: {
    tipo: TiposRespuestaEnum;
    presentacion: string;
}[] = [
    {
        tipo: TiposRespuestaEnum.ABIERTA,
        presentacion: 'Abierta',
    },
    {
        tipo: TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE,
        presentacion: 'Opción múltiple selección simple',
    },
    {
        tipo: TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE,
        presentacion: 'Opción múltiple selección múltiple',
    },
    {
        tipo: TiposRespuestaEnum.VERDADERO_FALSO,
        presentacion: 'Verdadero o Falso',
    }
]