import { Injectable } from "@nestjs/common";
import { Respuesta } from '../entities/respuestas.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRespuestaDto } from "../dtos/responderEncuestas/create-respuesta";
import { RespuestasAbiertas } from "../entities/respuestas_abiertas.entity";
import { RespuestasOpciones } from "../entities/respuestas_opciones.entity";


@Injectable()
export class RespuestasService{

    constructor(
        @InjectRepository(Respuesta)
        private respuestasRepository: Repository<Respuesta>,

        @InjectRepository(RespuestasAbiertas)
        private respuestasAbiertas: Repository<RespuestasAbiertas>,

        @InjectRepository(RespuestasOpciones)
        private respuestasOpciones: Repository<RespuestasOpciones>
    ) {}


    async crearRespuestas(dto: CreateRespuestaDto[], id: number): Promise<Respuesta[]> {
    const respuestas: Respuesta[] = [];
    
    for (const item of dto) {
        const nuevaRespuesta = this.respuestasRepository.create({
        encuesta: { id },
        });
        await this.respuestasRepository.save(nuevaRespuesta);
    
        if (item.tipo === 'ABIERTA') {
        const nuevaRespuestaAbierta = this.respuestasAbiertas.create({
            texto: item.texto,
            respuesta: nuevaRespuesta,
            pregunta: { id: item.idPregunta },
        });
        await this.respuestasAbiertas.save(nuevaRespuestaAbierta);
        } else if (item.tipo === 'OPCION') {
        const nuevaRespuestaOpcion = this.respuestasOpciones.create({
            opcion: { id: item.idOpcion },
            respuesta: nuevaRespuesta,
        });
        await this.respuestasOpciones.save(nuevaRespuestaOpcion);
        } else {
        throw new Error(`Tipo de respuesta no válido: ${item.tipo}`);
        }
    
        respuestas.push(nuevaRespuesta);
    }
    
    return respuestas;
    }

}