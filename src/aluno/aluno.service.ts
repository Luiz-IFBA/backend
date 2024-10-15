import { Inject, Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Repository } from 'typeorm';
import { Aluno } from './entities/aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlunoService {
 
  constructor(
    @InjectRepository(Aluno)
    private readonly repository: Repository<Aluno>){}

  create(dto: CreateAlunoDto) {
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
    const aluno = await this.repository.findOneBy({id});
    if (!aluno) return null;
    this.repository.merge(aluno, dto);
    return this.repository.save(aluno);
  }

  async remove(id: string) {
    const aluno = await this.repository.findOneBy({id});
    if (!aluno) return null;
    return this.repository.remove(aluno);
  }
}
