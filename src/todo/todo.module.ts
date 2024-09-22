import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoHandler } from './handlers/create-todo.handler';
import { UpdateTodoHandler } from './handlers/update-todo.handler';
import { DeleteTodoHandler } from './handlers/delete-todo.handler';
import { GetAllTodosHandler } from './handlers/get-all-todos.handler';
import { GetTodoHandler } from './handlers/get-todo.handler';

@Module({
  controllers: [TodoController],
  providers: [TodoService, CreateTodoHandler ,UpdateTodoHandler,
    DeleteTodoHandler,
    GetAllTodosHandler,
    GetTodoHandler,],
  imports: [ SequelizeModule.forFeature([Todo]), CqrsModule]
})
export class TodoModule {}
