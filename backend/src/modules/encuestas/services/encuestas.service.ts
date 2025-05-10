/* eslint-disable prettier/prettier */      
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEncuestaDTO } from '../dtos/createEncuestas/create-encuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';

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

  async obtenerEncuesta(
    id: number,
    codigo: string,
    codigoTipo: CodigoTipoEnum.RESPUESTA | CodigoTipoEnum.RESULTADOS,
  ): Promise<Encuesta> {
    const query = this.encuestasRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
      .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
      .where('encuesta.id = :id', { id });

    switch (codigoTipo) {
      case CodigoTipoEnum.RESPUESTA:
        query.andWhere('encuesta.codigoRespuesta = :codigo', { codigo });
        break;

      case CodigoTipoEnum.RESULTADOS:
        query.andWhere('encuesta.codigoResultados = :codigo', { codigo });
        break;
    }

    query.orderBy('pregunta.numero', 'ASC');
    query.addOrderBy('preguntaOpcion.numero', 'ASC');

    const encuesta = await query.getOne();

    if (!encuesta) {
      throw new BadRequestException('Datos de encuesta no válidos');
    }

    return encuesta;
  }

  async   eliminarEncuesta(
    id: number
  ): Promise<void> {
    
    // await this.encuestasRepository
    // .createQueryBuilder('encuesta')
    // .delete()
    // .where("encuesta.id = :id", { id: id })
    // .execute();
    
    await this.encuestasRepository
      .createQueryBuilder('encuesta')
      .innerJoinAndSelect('encuesta.preguntas', 'pregunta')
      .leftJoinAndSelect('pregunta.opciones', 'preguntaOpcion')
      .where('encuesta.id = :id', { id })
      .delete()
      .execute();
    // const encuesta = await query.getOne();
    // await this.encuestasRepository.delete(encuesta);    
  }


  async obtenerEncuestaToken(token: string) : Promise<Encuesta> {
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
