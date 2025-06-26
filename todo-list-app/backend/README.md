# To-Do List Application Backend

This is the backend part of the To-Do List application built using Java Spring Boot. The application provides a RESTful API for managing tasks with CRUD functionalities.

## Project Structure

```
backend
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── todolist
│   │   │               ├── TodoListApplication.java       # Entry point of the application
│   │   │               ├── controller
│   │   │               │   └── TaskController.java       # REST API for tasks
│   │   │               ├── model
│   │   │               │   └── Task.java                 # Task entity
│   │   │               ├── repository
│   │   │               │   └── TaskRepository.java       # JPA repository for tasks
│   │   │               ├── service
│   │   │               │   └── TaskService.java          # Business logic for tasks
│   │   │               └── enums
│   │   │                   ├── Priority.java             # Enum for task priority
│   │   │                   └── Status.java               # Enum for task status
│   │   └── resources
│   │       ├── application.properties                      # Application configuration
│   │       └── db
│   │           └── schema.sql                             # Database schema
├── pom.xml                                               # Maven configuration
└── README.md                                             # Documentation for the backend
```

## Features

- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Task Management**: Manage tasks with fields for task name, status, and priority.
- **Filtering**: Filter tasks by priority.
- **Database**: Uses MySQL for data storage.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd todo-list-app/backend
   ```

2. **Configure the database**:
   Update the `application.properties` file with your MySQL database connection details.

3. **Run the application**:
   Use Maven to build and run the application:
   ```
   mvn spring-boot:run
   ```

4. **Access the API**:
   The API will be available at `http://localhost:8080/api/tasks`.

## Dependencies

- Spring Boot
- Spring Data JPA
- MySQL Driver

## License

This project is licensed under the MIT License.