import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePreguntaDTO } from '../createEncuestas/create-pregunta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEncuestaDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ type: [CreatePreguntaDTO] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePreguntaDTO)
  preguntas: CreatePreguntaDTO[];
}