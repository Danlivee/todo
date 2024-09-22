import { IQuery } from '@nestjs/cqrs';

export class GetTodoQuery implements IQuery {
  constructor(public readonly id: number) {}
}