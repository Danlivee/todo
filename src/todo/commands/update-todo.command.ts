import { ICommand } from '@nestjs/cqrs';

export class UpdateTodoCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly title?: string,
    public readonly description?: string,
    public readonly completed?: boolean,
  ) {}
}