import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Todo } from './todo/entities/todo.entity';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { DB_DIALECT, DB_HOST, DB_NAME_TEST, DB_PASS, DB_PORT, DB_USER } from './constants';


@Module({
  imports: [ SequelizeModule.forRoot({
      dialect: DB_DIALECT,
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME_TEST,
      models: [Todo],
      autoLoadModels: true,
      synchronize: true,}),
    TodoModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, ElasticsearchModule],
  exports: [ElasticsearchModule]
})
export class AppModule {}
