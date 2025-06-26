# Frontend To-Do List Application

This is the frontend part of the To-Do List application built with Angular. It interacts with a Spring Boot backend to manage tasks.

## Project Structure

- **src/**: Contains the source code for the Angular application.
  - **app/**: Contains the main application components and services.
    - **components/**: Contains reusable components.
      - **task-list/**: Displays the list of tasks.
      - **task-form/**: Provides a form for creating and editing tasks.
      - **filter/**: Allows filtering tasks by priority.
    - **models/**: Contains the data models used in the application.
    - **services/**: Contains services for handling API requests.
  - **assets/**: Contains static assets such as images and stylesheets.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the frontend directory:
   ```
   cd todo-list-app/frontend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application in development mode, use the following command:
```
ng serve
```
The application will be available at `http://localhost:4200`.

## Features

- **CRUD Functionality**: Create, read, update, and delete tasks.
- **Task Filtering**: Filter tasks by priority.
- **Task Management**: Mark tasks as completed.

## Contributing

Contributions are welcome! Please submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License.