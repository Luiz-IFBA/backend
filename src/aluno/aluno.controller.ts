import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const aluno = await this.alunoService.findOne(id);
    if(!aluno) throw new NotFoundException();
    return aluno;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    const aluno = await this.alunoService.update(id, updateAlunoDto);
    if(!aluno) throw new NotFoundException();
    return aluno;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const aluno = await this.alunoService.remove(id);
    if(!aluno) throw new NotFoundException();
  }
}
