# Contact Agenda API

This is a Spring Boot application for managing a contact agenda. It allows users to store and retrieve contact information, including name, phone number, email, and notes. The application provides a RESTful API for interacting with the contact data.

## Features

- Add new contacts
- Retrieve all contacts
- Search for contacts by name
- Update existing contacts
- Delete contacts

## Technologies Used

- Spring Boot
- Spring Data JPA
- H2 Database (in-memory)
- Maven

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd contact-agenda-api
   ```

3. Build the project using Maven:
   ```
   mvn clean install
   ```

4. Run the application:
   ```
   mvn spring-boot:run
   ```

### API Endpoints

- **Add Contact**: `POST /contacts`
- **Get All Contacts**: `GET /contacts`
- **Search Contact by Name**: `GET /contacts/search?name={name}`
- **Update Contact**: `PUT /contacts/{id}`
- **Delete Contact**: `DELETE /contacts/{id}`

## License

This project is licensed under the MIT License. See the LICENSE file for details.