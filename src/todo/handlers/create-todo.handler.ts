import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoService } from '../services/todo.service';
import { CreateTodoCommand } from '../commands/create-todo.command';
import { Todo } from '../entities/todo.entity';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(private readonly todoService: TodoService) {}

  async execute(command: CreateTodoCommand): Promise<Todo> {
    const { title, description } = command;
    return this.todoService.create({ title, description });
  }
}