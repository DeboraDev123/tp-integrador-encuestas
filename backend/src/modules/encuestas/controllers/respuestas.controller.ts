import { Controller } from "@nestjs/common";
// import { RespuestasService } from "../services/respuestas.service";
import { CreateRespuestaDto } from "../dtos/responderEncuestas/create-respuesta"



@Controller('respuestas')
export class RespuestaController {
    constructor(){}

    // @Post()
    // async crearRespuesta(@Body() dto: CreateRespuestaDto): Promise<{
    //     message: string,
    //     data: any,
    //     status: number
    // }> {
    //     return await this.respuestasService.crearRespuesta(dto);
    // }
}