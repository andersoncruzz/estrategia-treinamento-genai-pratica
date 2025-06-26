# Contact Agenda API

This project is a simple Spring Boot application that serves as a contact agenda. It allows users to manage contacts with the following fields:

- Name
- Phone
- Email
- Notes

## Features

- Add new contacts
- Retrieve all contacts
- Search for contacts by name

## Endpoints

### Search Contacts by Name

- **GET** `/contacts/search?name={name}`

This endpoint allows you to search for contacts by their name.

## Technologies Used

- Spring Boot
- Spring Data JPA
- H2 Database (for in-memory storage during development)

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Run the application using the command: `mvn spring-boot:run`.
4. Access the API at `http://localhost:8080`.

## Testing

Unit tests are included in the project to ensure the application functions as expected. You can run the tests using the command: `mvn test`.

## License

This project is licensed under the MIT License.