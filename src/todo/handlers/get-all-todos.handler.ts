import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoService } from '../services/todo.service';
import { GetAllTodosQuery } from '../queries/get-all-todos.query';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetAllTodosQuery)
export class GetAllTodosHandler implements IQueryHandler<GetAllTodosQuery> {
  constructor(private readonly todoService: TodoService) {}

  async execute() {
    const result =  await this.todoService.findAll();
    if (result.length == 0) {
      throw new NotFoundException(`There are no todos in the database`);
    }
    return result;
  }
}