import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateResTextDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    texto: string;

}