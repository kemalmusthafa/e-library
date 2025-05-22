# 📚 E-Library API

A modern, RESTful API for managing digital book collections with secure authentication and advanced filtering capabilities.

🚀 Quick Start
Prerequisites

Node.js 16+
npm or yarn
Database (PostgreSQL/MySQL/SQLite)

Installation

bash# Clone the repository

git clone https://github.com/kemalmusthafa/e-library.git

cd e-library

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev

🔐 Authentication

Register New User

http POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response:

json{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}

Login
http POST /auth/login

Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:

json{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}

📖 Book Management

Note: Include the JWT token in the Authorization header for protected routes:
Authorization: Bearer your_jwt_token

Get All Books

http GET /books

Get Book by ID

http GET /books/1

Create New Book

http POST /books

Update Book

http PUT /books/1

Delete Book

http DELETE /books/1
