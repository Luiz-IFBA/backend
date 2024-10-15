import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Repository } from 'typeorm';
import { Aluno } from './entities/aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly repository: Repository<Aluno>,
  ) {}

  async create(dto: CreateAlunoDto) {
    // Verifica se já existe um aluno com o mesmo CPF ou e-mail
    const existingAluno = await this.findByCpfOrEmail(dto.cpf, dto.email);
    if (existingAluno) {
      throw new ConflictException('Aluno com CPF ou e-mail já cadastrado.');
    }

    const aluno = this.repository.create(dto);
    return this.repository.save(aluno);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateAlunoDto) {
    const aluno = await this.repository.findOneBy({ id });
    if (!aluno) return null;

    // Verifica se existe outro aluno com o mesmo CPF ou e-mail, excluindo o aluno atual
    const existingAluno = await this.findByCpfOrEmail(dto.cpf, dto.email);
    if (existingAluno && existingAluno.id !== aluno.id) {
      throw new ConflictException('Já existe um aluno com CPF ou e-mail cadastrado.');
    }

    this.repository.merge(aluno, dto);
    return this.repository.save(aluno);
  }

  async remove(id: string) {
    const aluno = await this.repository.findOneBy({ id });
    if (!aluno) return null;
    return this.repository.remove(aluno);
  }

  // Novo método para buscar aluno por CPF ou e-mail
  private async findByCpfOrEmail(cpf: string, email: string): Promise<Aluno | null> {
    return this.repository.findOne({
      where: [
        { cpf },
        { email },
      ],
    });
  }
}
