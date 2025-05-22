Installation

Clone the repository:

git clone https://github.com/kemalmusthafa/e-library.git
cd book-manager

Install dependencies:

npm install
npx prisma generate

How to use authentication

Register a new user:

POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Login to get a token:

POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Example Requests
Get all books
GET /books
Get books with filter
GET /books?title=Harry&year=1997
Get a book by ID
GET /books/1
Create a new book
POST /books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}
Update a book
PUT /books/1
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "year": 2022
}
Delete a book
DELETE /books/1

