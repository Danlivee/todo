import { TODO_TABLE_NAME } from '../src/constants';

'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize, DataType } = require('sequelize-typescript');
module.exports = (sequelize) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  todo.init({
    id: DataType.INTEGER,
    title: DataType.STRING,
    description: DataType.STRING,
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
    deletedAt:  DataType.DATE
  }, {
    sequelize,
    modelName: 'todos',
  });
  return todo;
};