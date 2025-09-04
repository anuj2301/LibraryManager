# Library Management System (Updated)

## Backend (Spring Boot + MongoDB)
- Module: `Library-Manager`
- Run: `mvn spring-boot:run`
- Default Port: 8080
- MongoDB: `mongodb://localhost:27017/librarydb`

APIs (prefix `/api`):
- `GET /api/books`
- `POST /api/books`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`

- `GET /api/users`
- `POST /api/users`
- `POST /api/users/{userId}/borrow` body: `{ "bookId": "..." }`
- `POST /api/users/{userId}/return` body: `{ "bookId": "..." }`

## Frontend (React)
- Module: `library-management-frontend`
- Run: `npm install` then `npm start`
- Expects backend on `http://localhost:8080`

