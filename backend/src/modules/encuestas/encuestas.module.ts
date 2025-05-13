import { Module } from '@nestjs/common';
import { EncuestasController } from './controllers/encuestas.controller';
import { EncuestasService } from './services/encuestas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from './entities/opcion.entity';
import { Respuesta } from './entities/respuestas.entity';
import { RespuestasAbiertas } from './entities/respuestas_abiertas.entity';
import { RespuestasOpciones } from './entities/respuestas_opciones.entity';
import { RespuestaController } from './controllers/respuestas.controller';
import { RespuestasService } from './services/respuestas.service';

@Module({
    imports:[TypeOrmModule.forFeature([Encuesta, Pregunta, Opcion, Respuesta, RespuestasAbiertas, RespuestasOpciones])],
    controllers:[EncuestasController, RespuestaController],
    providers:[EncuestasService, RespuestasService],
})
export class EncuestasModule{

}