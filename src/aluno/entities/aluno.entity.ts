import { BeforeInsert, Column, Entity, PrimaryColumn, Unique } from "typeorm";

const {nanoid} = require("nanoid");
@Unique(['cpf', 'email']) // Array de strings com os campos separados
@Entity('alunos')
export class Aluno {
    @PrimaryColumn()
    id: string; //aluno_diwu091283

    @Column()
    cpf: string;

    @Column()
    nome: string;

    @Column()
    telefone: string;

    @Column()
    nascimento: string;

    @Column()
    enderecoResidencia: string;

    @Column()
    enderecoEscola: string;

    @Column()
    turnoEstudo: string;

    @Column()
    email: string;

    @Column()
    codigoTurma: string;

    @BeforeInsert()
    generateId() {
        this.id = `aln_${nanoid()}`;
    }
}