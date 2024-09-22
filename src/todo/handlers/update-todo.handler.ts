import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoService } from '../services/todo.service';
import { UpdateTodoCommand } from '../commands/update-todo.command';
import { NotFoundException } from '@nestjs/common';
import { json } from 'express';
import { getText } from '@nestjs/swagger/dist/plugin/utils/ast-utils';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(private readonly todoService: TodoService) {}

  async execute(command: UpdateTodoCommand) {
    const { id, title, description, completed } = command;
    const updateData = { title, description, completed };
    const result = await this.todoService.update(id, updateData);
    if (!result || result[0] == 0 ) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return new Response(`Todo with id ${id} successfully updated`).text();
  }
}