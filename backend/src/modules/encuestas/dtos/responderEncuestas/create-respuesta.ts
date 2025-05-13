import {ArrayNotEmpty, IsArray,
        IsEnum,
        IsNotEmpty,
        IsString,
        ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TiposRespuestaEnum } from '../../enums/tipos-respuesta.enum';


export class  CreateRespuestaDto {
    @ApiProperty({ enum: TiposRespuestaEnum })
    @IsEnum(TiposRespuestaEnum)
    tipo: TiposRespuestaEnum;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateRespuestaDto)
    respuestas?: CreateRespuestaDto[];

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    texto?: string;
    

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @Type(() => Number)
    idPregunta: number;


    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @Type(() => Number)
    idOpcion?: number;
}