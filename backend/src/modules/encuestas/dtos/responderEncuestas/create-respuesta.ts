import {IsNotEmpty,
    IsString,
    MinLength
} from 'class-validator';


export class CreateRespuestaDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    texto: string;

}