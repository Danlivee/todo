import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoCommand } from '../commands/create-todo.command';
import { GetAllTodosQuery } from '../queries/get-all-todos.query';
import { GetTodoQuery } from '../queries/get-todo.query';
import { UpdateTodoCommand } from '../commands/update-todo.command';
import { DeleteTodoCommand } from '../commands/delete-todo.command';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Todo } from '../entities/todo.entity';
import * as Constants from '../../constants';

@ApiTags(Constants.TODO_TABLE_NAME)
@Controller(Constants.TODO_TABLE_NAME)
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @ApiCreatedResponse({
    description: Constants.CREATED_SUCCESSFULLY,
    type: Todo,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: Constants.BAD_REQUEST })
  @ApiBody({
    schema: {
      properties: {
        title:  {type: 'string', example: Constants.TITLE_EXAMPLE } ,
        description: { example: Constants.DESCRIPTION_EXAMPLE },
      },
    },
  })
  @Post()
  create(@Body() body: {title: string, description: string}) {
    const { title, description } = body;
    return this.commandBus.execute(new CreateTodoCommand(title, description));
  }

  @ApiOperation({ summary: Constants.GET_ALL_TODOS_SUMMARY })
  @ApiResponse({ status: 200, description: Constants.GET_ALL_TODOS_DESCRIPTION })
  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllTodosQuery());
  }

  @ApiOperation({ summary: Constants.GET_TODO_BY_ID_SUMMARY })
  @ApiResponse({ status: 200, description: Constants.GET_TODO_BY_ID_SUMMARY })
  @ApiResponse({ status: 404, description: Constants.TODO_NOT_FOUND })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.queryBus.execute(new GetTodoQuery(id));
  }

  @ApiOperation({ summary: Constants.TODO_NOT_FOUND })
  @ApiResponse({ status: 200, description: Constants.UPDATE_TODO_SUCCESS })
  @ApiResponse({ status: 404, description: Constants.TODO_NOT_FOUND })
  @ApiBody({
    schema: {
      properties: {
        title:  {type: 'string', example: Constants.TITLE_EXAMPLE } ,
        description: { example: Constants.DESCRIPTION_EXAMPLE },
      },
    },
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() body: { title: string, description: string, completed: boolean } ) {
    const { title, description, completed } = body;
    return this.commandBus.execute( new UpdateTodoCommand(id, title, description, completed ));
  }

  @ApiOperation({ summary: Constants.DELETE_TODO_BY_ID_SUMMARY })
  @ApiResponse({ status: 200, description: Constants.DELETE_TODO_SUCCESS })
  @ApiResponse({ status: 404, description: Constants.TODO_NOT_FOUND })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteTodoCommand(id));
  }
}
