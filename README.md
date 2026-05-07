# CRM Backend System

This is a backend API for a Customer Relationship Management system. It handles user authentication, customer records, and support case tracking. Built as part of a backend development assignment using Node.js, Express, and MongoDB.

---

## Tech Stack

- Node.js and Express for the server
- MongoDB with Mongoose for the database
- JWT for secure authentication
- bcryptjs for password hashing
- Nodemon for development

---

## How to Run

1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file based on `.env.example` and add your values
4. Make sure MongoDB is running on your machine
5. Run `npm run dev` to start the development server

The server will start at `http://localhost:5000`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and get a JWT token
- `GET /api/auth/me` — get current logged in user

### Customers
- `GET /api/customers` — get all customers
- `POST /api/customers` — create a new customer
- `GET /api/customers/:id` — get a specific customer
- `PUT /api/customers/:id` — update customer details
- `DELETE /api/customers/:id` — delete a customer

### Cases
- `GET /api/cases` — get all support cases
- `POST /api/cases` — create a new case
- `PATCH /api/cases/:id` — update a case
- `DELETE /api/cases/:id` — delete a case

### Dashboard
- `GET /api/dashboard/stats` — get total counts and recent activity

---

## Security

All routes except login and register are protected. A valid JWT token must be passed in the Authorization header as a Bearer token. Users have roles — admin, manager, and agent — each with different permissions. Passwords are never stored as plain text.

---

## Project Structure
crm-backend/
├── app/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── services/
├── config/
├── tests/
├── docs/
└── server.js

## Testing
Run `npm test` to run the test suite.