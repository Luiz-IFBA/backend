import { IsDateString, IsEmail, IsNumberString, IsPhoneNumber, IsString } from "class-validator";

export class CreateAlunoDto {

    @IsNumberString()
    cpf: string;

    @IsString()
    nome: string;

    @IsPhoneNumber("BR")
    telefone: string;

    @IsDateString()
    nascimento: string

    @IsString()
    enderecoResidencia: string;

    @IsString()
    enderecoEscola: string;

    @IsString()
    turnoEstudo: string;

    @IsEmail()
    email: string;

    @IsNumberString()
    codigoTurma: string;

}
