/* eslint-disable prettier/prettier */      
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEncuestaDTO } from '../dtos/createEncuestas/create-encuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { UpdateEncuestaDTO } from '../dtos/updateEncuestas/update-encuesta.dto';

@Injectable()
export class EncuestasService {

  constructor(
    @InjectRepository(Encuesta)
    private encuestasRepository: Repository<Encuesta>,
  ) {}

  async crearEncuesta(dto: CreateEncuestaDTO): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    const encuesta: Encuesta = this.encuestasRepository.create({
      ...dto,
      codigoRespuesta: v4(),
      codigoResultados: v4(),
    });

    const encuestaGuardada = await this.encuestasRepository.save(encuesta);

    return {
      id: encuestaGuardada.id,
      codigoRespuesta: encuestaGuardada.codigoRespuesta,
      codigoResultados: encuestaGuardada.codigoResultados,
    };
  }

  async modificarEncuesta(dto: UpdateEncuestaDTO): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    const encuestaGuardada = await this.encuestasRepository.save(dto);

    return {
      id: encuestaGuardada.id,
      codigoRespuesta: encuestaGuardada.codigoRespuesta,
      codigoResultados: encuestaGuardada.codigoResultados,
    };
  }

  async obtenerEncuesta(
  id: number,
  codigo: string,
  codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS,
): Promise<Encuesta> {
  // console.log(codigo)
  // console.log(codigoTipo)
  
  // Para resultados, usar método específico
  if (codigoTipo === CodigoTipoEnum.RESULTADOS) {
    return this.obtenerResultadosEncuesta(id, codigo);
  }

  // Para respuestas (participar), método normal
  const query = this.encuestasRepository
    .createQueryBuilder('encuesta')
    .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
    .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
    .where('encuesta.id = :id', { id })
    .andWhere('encuesta.codigoRespuesta = :codigo', { codigo });

  query.orderBy('pregunta.numero', 'ASC');
  query.addOrderBy('preguntaOpcion.numero', 'ASC');

  const encuesta = await query.getOne();

  if (!encuesta) {
    throw new BadRequestException('Código no válido para el tipo especificado o encuesta no encontrada');
  }

  return encuesta;
}

async obtenerResultadosEncuesta(id: number, codigo: string): Promise<Encuesta> {
  const query = this.encuestasRepository
    .createQueryBuilder('encuesta')
    .leftJoinAndSelect('encuesta.respuestas', 'respuesta')
    .leftJoinAndSelect('respuesta.respuestasAbiertas', 'respuestaAbierta')
    .leftJoinAndSelect('respuestaAbierta.pregunta', 'preguntaAbierta')
    .leftJoinAndSelect('respuesta.respuestasOpciones', 'respuestaOpcion')
    .leftJoinAndSelect('respuestaOpcion.opcion', 'opcionSeleccionada')
    .leftJoinAndSelect('opcionSeleccionada.pregunta', 'preguntaOpcion')
    .where('encuesta.id = :id', { id })
    .andWhere('encuesta.codigoResultados = :codigo', { codigo });

  const encuesta = await query.getOne();

  if (!encuesta) {
    throw new BadRequestException('Código no válido para resultados o encuesta no encontrada');
  }

  return encuesta;
}


  async obtenerTodasLasEncuestas(): Promise<Encuesta[]> {
    const query = this.encuestasRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
      .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion');
    query.orderBy('pregunta.numero', 'ASC');
    query.addOrderBy('preguntaOpcion.numero', 'ASC');

    const encuesta = await query.getMany();
    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }

    return encuesta;
  }
  async obtenerPreguntasParaResponder(
    id: number,
    codigo: string,
  ): Promise<Encuesta> {
    const query = this.encuestasRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
      .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
      .where('encuesta.id = :id', { id })
      .andWhere('encuesta.codigoRespuesta = :codigo', { codigo });

    query.orderBy('pregunta.numero', 'ASC');
    query.addOrderBy('preguntaOpcion.numero', 'ASC');

    const encuesta = await query.getOne();


    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }

    return encuesta;
  }


  async eliminarEncuesta(id: number): Promise<void> {

    await this.encuestasRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
      .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
      .where('encuesta.id = :id', { id })
      .delete()
      .execute();
  }

  async obtenerEncuestaToken(token: string): Promise<Encuesta> {
    const encuesta = await this.encuestasRepository.createQueryBuilder('encuesta')
      .where('encuesta.codigoResultados = :token', { token })
      .orWhere('encuesta.codigoRespuesta = :token', { token })
      .getOne();

    if (!encuesta) {
      throw new BadRequestException('Token no válido');
    }

    const esResultado = encuesta.codigoResultados === token;

    return this.obtenerEncuesta(
      encuesta.id,
      token,
      esResultado ? CodigoTipoEnum.RESULTADOS : CodigoTipoEnum.RESPUESTA
    );
  }
}
