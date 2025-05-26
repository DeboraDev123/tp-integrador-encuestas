import { Body, Controller, Param, Post } from "@nestjs/common";
import { RespuestasService } from "../services/respuestas.service";
import { ResponderEncuestaDto } from "../dtos/responderEncuestas/responder-encuesta.dto";
import { CreateRespuestaDto } from "../dtos/responderEncuestas/create-respuesta";
import { Respuesta } from '../entities/respuestas.entity';
import { ToArrayPipe } from "../pipe/toArrayPip";

@Controller('respuestas')
export class RespuestaController {
    constructor(private respuestasService: RespuestasService) {}

    @Post()
    async responderEncuesta(@Body() dto: ResponderEncuestaDto): Promise<void> {
        return await this.respuestasService.responderEncuesta(dto);
    }

    @Post(':id')
    async crearRespuestas(
        @Param('id') id: number,
        @Body(new ToArrayPipe()) dto: CreateRespuestaDto[]
    ): Promise<{ respuestas: Respuesta[] }> {
        const respuestas = await this.respuestasService.crearRespuestas(dto, id);
        return { respuestas };
    }
}
