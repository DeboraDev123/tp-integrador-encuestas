import { Body, Controller, Post } from "@nestjs/common";
import { RespuestasService } from "../services/respuestas.service";
import { ResponderEncuestaDto } from "../dtos/responderEncuestas/responder-encuesta.dto";

@Controller('respuestas')
export class RespuestaController {
    constructor(private respuestasService: RespuestasService) {}

    @Post()
    async responderEncuesta(@Body() dto: ResponderEncuestaDto): Promise<void> {
        return await this.respuestasService.responderEncuesta(dto);
    }
}