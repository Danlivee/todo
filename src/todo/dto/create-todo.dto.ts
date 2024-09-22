import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
