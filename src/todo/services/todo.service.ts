import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoModel.create(createTodoDto);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.findAll();
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoModel.findByPk(id);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.todoModel.update(updateTodoDto,
      { where: { id }});
  }

  async remove(id: number): Promise<number> {
    return this.todoModel.destroy({ where: { id } });
  }
}
