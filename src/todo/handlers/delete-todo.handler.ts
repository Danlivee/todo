import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoService } from '../services/todo.service';
import { DeleteTodoCommand } from '../commands/delete-todo.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(private readonly todoService: TodoService) {}

  async execute(command: DeleteTodoCommand): Promise<string> {
    const { id } = command;
    const result = await this.todoService.remove(id);
    if (!result) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return await new Response(`Todo with id ${id} successfully deleted`).text();
  }
}