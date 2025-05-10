import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encuesta } from '../entities/encuesta.entity';
import { Pregunta } from '../entities/pregunta.entity';
import { Respuesta } from '../entities/respuestas.entity';
import { RespuestasAbiertas } from '../entities/respuestas_abiertas.entity';
import { RespuestasOpciones } from '../entities/respuestas_opciones.entity';
import { ResponderEncuestaDto } from '../dtos/responderEncuestas/responder-encuesta.dto';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private encuestasRepository: Repository<Encuesta>,
    @InjectRepository(Pregunta)
    private preguntasRepository: Repository<Pregunta>,
    @InjectRepository(Respuesta)
    private respuestasRepository: Repository<Respuesta>,
    @InjectRepository(RespuestasAbiertas)
    private respuestasAbiertasRepository: Repository<RespuestasAbiertas>,
    @InjectRepository(RespuestasOpciones)
    private respuestasOpcionesRepository: Repository<RespuestasOpciones>,
  ) {}

  async responderEncuesta(dto: ResponderEncuestaDto): Promise<void> {
    // Verificar que la encuesta existe
    const encuesta = await this.encuestasRepository.findOne({
      where: { id: dto.idEncuesta },
    });

    if (!encuesta) {
      throw new BadRequestException('La encuesta no existe');
    }

    // Crear la respuesta
    const respuesta = this.respuestasRepository.create({
      encuesta,
    });
    await this.respuestasRepository.save(respuesta);

    // Procesar cada respuesta
    for (const respuestaPregunta of dto.respuestas) {
      const pregunta = await this.preguntasRepository.findOne({
        where: { id: respuestaPregunta.idPregunta },
        relations: ['opciones'],
      });

      if (!pregunta) {
        throw new BadRequestException(`La pregunta ${respuestaPregunta.idPregunta} no existe`);
      }

      // Si es pregunta abierta
      if (respuestaPregunta.texto) {
        const respuestaAbierta = this.respuestasAbiertasRepository.create({
          respuesta,
          pregunta,
          texto: respuestaPregunta.texto,
        });
        await this.respuestasAbiertasRepository.save(respuestaAbierta);
      }

      // Si tiene opciones seleccionadas
      if (respuestaPregunta.idOpciones && respuestaPregunta.idOpciones.length > 0) {
        for (const idOpcion of respuestaPregunta.idOpciones) {
          const opcion = pregunta.opciones.find(o => o.id === idOpcion);
          if (!opcion) {
            throw new BadRequestException(`La opción ${idOpcion} no existe para la pregunta ${pregunta.id}`);
          }

          const respuestaOpcion = this.respuestasOpcionesRepository.create({
            respuesta,
            opcion,
          });
          await this.respuestasOpcionesRepository.save(respuestaOpcion);
        }
      }
    }
  }
}

