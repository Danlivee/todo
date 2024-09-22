import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoService } from '../services/todo.service';
import { GetTodoQuery } from '../queries/get-todo.query';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(private readonly todoService: TodoService) {}

  async execute(query: GetTodoQuery) {
    const todo = await this.todoService.findOne(query.id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${query.id} not found`);
    }
    return todo;
  }
}