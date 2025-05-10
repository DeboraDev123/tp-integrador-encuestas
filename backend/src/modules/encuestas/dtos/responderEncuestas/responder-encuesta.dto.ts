import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RespuestaPreguntaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  idPregunta: number;

  @ApiProperty({ required: false })
  @IsString()
  texto?: string;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  idOpciones?: number[];
}

export class ResponderEncuestaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  idEncuesta: number;

  @ApiProperty({ type: [RespuestaPreguntaDto] })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RespuestaPreguntaDto)
  respuestas: RespuestaPreguntaDto[];
} 