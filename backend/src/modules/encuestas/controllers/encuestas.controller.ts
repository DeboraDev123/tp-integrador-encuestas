import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { EncuestasService } from '../services/encuestas.service';
import { CreateEncuestaDTO } from '../dtos/createEncuestas/create-encuesta.dto';
import { Encuesta } from '../entities/encuesta.entity';
import { ObtenerEncuestaDto, ParticiparEncuestaDto } from '../dtos/obtener-encuesta.dto';

@Controller('encuestas')
export class EncuestasController {

  constructor(private encuestasService: EncuestasService) {}

  @Post()
  async crearEncuesta(@Body() dto: CreateEncuestaDTO): Promise<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    return await this.encuestasService.crearEncuesta(dto);
  }

  @Get(':id')
  async obtenerEncuesta(
    @Param('id') id: number,
    @Query() dto: ObtenerEncuestaDto,
  ): Promise<Encuesta> {
    return await this.encuestasService.obtenerEncuesta(
      id,
      dto.codigo,
      dto.tipo,
    );
  }

  @Get(':id/participar')
  async obtenerPreguntasParaResponder(
    @Param('id') id: number,
    @Query() dto: ParticiparEncuestaDto,
  ): Promise<Encuesta> {
    return await this.encuestasService.obtenerPreguntasParaResponder(
      id,
      dto.codigo,
    );
  }

  @Delete('eliminar/:id')
  async eliminarEncuesta(@Param('id') id: number): Promise<void> {
    return await this.encuestasService.eliminarEncuesta(id);
  }
}
