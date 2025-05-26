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
import { CreatePreguntaDTO } from './create-pregunta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEncuestaDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsNumber()
  estado: number = 1;

  @ApiProperty({ type: [CreatePreguntaDTO] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePreguntaDTO)
  preguntas: CreatePreguntaDTO[];
}