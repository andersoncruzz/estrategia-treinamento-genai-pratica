# To-Do List Application

This project is a To-Do List application built with a Java Spring Boot backend and an Angular frontend. It allows users to create, manage, and filter tasks based on their priority and status.

## Project Structure

The project is organized into two main parts: the backend and the frontend.

### Backend

The backend is developed using Spring Boot and follows a standard structure:

- **src/main/java/com/example/todolist**: Contains the main application code.
  - **TodoListApplication.java**: The entry point of the Spring Boot application.
  - **controller**: Contains REST API controllers.
    - **TaskController.java**: Manages task-related API endpoints.
  - **model**: Contains the data models.
    - **Task.java**: Represents a task entity with fields for task name, status, and priority.
  - **repository**: Contains the data access layer.
    - **TaskRepository.java**: Provides CRUD operations for tasks.
  - **service**: Contains business logic.
    - **TaskService.java**: Manages task operations.
  - **enums**: Contains enumerations for task status and priority.
    - **Priority.java**: Defines task priority levels (LOW, MEDIUM, HIGH).
    - **Status.java**: Defines task status (PENDING, COMPLETED).
- **src/main/resources**: Contains configuration and initialization files.
  - **application.properties**: Configuration settings for the Spring Boot application.
  - **db/schema.sql**: SQL statements for initializing the database schema.
- **pom.xml**: Maven configuration file for project dependencies and build settings.
- **README.md**: Documentation for the backend part of the project.

### Frontend

The frontend is developed using Angular and is structured as follows:

- **src/app**: Contains the main application code.
  - **components**: Contains reusable components.
    - **task-list**: Displays a list of tasks.
      - **task-list.component.ts**: Logic for displaying and interacting with tasks.
    - **task-form**: Provides a form for creating and editing tasks.
      - **task-form.component.ts**: Logic for task creation and editing.
    - **filter**: Allows users to filter tasks by priority.
      - **filter.component.ts**: Logic for filtering tasks.
  - **models**: Contains data models.
    - **task.model.ts**: Defines the structure of a task object.
  - **services**: Contains services for API interactions.
    - **task.service.ts**: Handles HTTP requests to the backend API.
  - **app.module.ts**: The main module of the Angular application.
- **assets**: Contains static assets such as images and stylesheets.
- **angular.json**: Configuration settings for the Angular project.
- **package.json**: npm configuration file listing project dependencies and scripts.
- **README.md**: Documentation for the frontend part of the project.

## Features

- **CRUD Functionality**: Create, Read, Update, and Delete tasks.
- **Task Management**: Mark tasks as completed and filter tasks by priority.
- **Database Integration**: Uses MySQL for data storage.

## Getting Started

To run the application, follow these steps:

1. **Backend Setup**:
   - Navigate to the `backend` directory.
   - Configure the database connection in `application.properties`.
   - Run the Spring Boot application.

2. **Frontend Setup**:
   - Navigate to the `frontend` directory.
   - Install dependencies using `npm install`.
   - Run the Angular application using `ng serve`.

## Contributing

Contributions are welcome! Please submit a Pull Request with your changes.