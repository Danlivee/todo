import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as Constants from '../../constants';

@Table({ tableName: Constants.TODO_TABLE_NAME, timestamps: true, paranoid: true })
export class Todo extends Model<Todo> {

  @ApiProperty ({
    type: DataType.INTEGER,
    description: Constants.TODO_ID_DESCRIPTION,
    example: Constants.TODO_ID_EXAMPLE
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @ApiProperty({
    type: String,
    description: Constants.TODO_TITLE_DESCRIPTION,
    example: Constants.TITLE_EXAMPLE
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiPropertyOptional({
    type: String,
    description: Constants.TODO_DESCRIPTION_DESCRIPTION,
    example: Constants.DESCRIPTION_EXAMPLE
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiPropertyOptional({
    type: Boolean,
    description: Constants.TODO_COMPLETED_DESCRIPTION,
    example: true,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed: boolean;

  @ApiPropertyOptional({
    type: Date,
    example: new Date(),
    description: Constants.TODO_COMPLETED_DESCRIPTION
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt: Date;

  @ApiPropertyOptional({
    type: Date,
    example: new Date(),
    description: Constants.TODO_UPDATED_AT_DESCRIPTION
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;


  @ApiPropertyOptional({
    type: Date,
    example: new Date(),
    description: Constants.TODO_DELETED_AT_DESCRIPTION
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;
}
