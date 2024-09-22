# Todo Application with NestJS, Sequelize, and CQRS

This project is a **Todo application** built using **NestJS**, **Sequelize ORM**, and **CQRS (Command Query Responsibility Segregation)** pattern. The application provides a REST API for creating, retrieving, updating, and deleting todos, with support for database migrations and seeders.

## Installation

1. Clone the repository:
2. Navigate to the project directory:
``cd todo-app``
3. Install the dependencies:
``npm install``
4. Set up environment variables:

Modify a `/constants/index.ts` file in the project root directory with the following variables:
```DATABASE_HOST=localhost 
DATABASE_PORT=5432 
DATABASE_USER=your_db_user 
DATABASE_PASSWORD=your_db_password 
DATABASE_NAME=your_db_name
```

## Running the Application

Run the application:
``npm run start``

The application will be running on [http://localhost:3000](http://localhost:3000).

## Database Migrations

The project uses Sequelize migrations to manage schema changes.

### Running Migrations

Run the following command to apply pending migrations:
``npx sequelize-cli db:migrate``


## Database Seeders

Seeders populate the database with initial data.

### Running Seeders

Run all seeders:
``npx sequelize-cli db:seed:all``


## Swagger API Documentation

The Swagger UI is available at:

[http://localhost:3000/api](http://localhost:3000/api).


## Environment Variables

The required environment variables are:

| Variable             | Description                       |
| -------------------- | --------------------------------- |
| `DATABASE_HOST`       | The host of the database          |
| `DATABASE_PORT`       | The port of the database          |
| `DATABASE_USER`       | The username for the database     |
| `DATABASE_PASSWORD`   | The password for the database     |
| `DATABASE_NAME`       | The name of the database          |

## Available Endpoints

- POST /todos: Create a new todo
- GET /todos: Retrieve a list of all todos
- GET /todos/:id: Retrieve a single todo by its ID
- PUT /todos/:id: Update a todo by its ID
- DELETE /todos/:id: Soft delete a todo by its ID


