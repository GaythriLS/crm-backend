# CRM Backend

A backend system for managing customers, support cases, and users — built with Node.js, Express, and MongoDB.

---

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing

---

## Getting Started

Clone the repo and install dependencies:

npm install

Create a .env file by copying the example and fill in your values:

PORT=5000
MONGO_URI=mongodb://localhost:27017/crm_db
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development

Start the server:

npm run dev

Server runs at http://localhost:5000

---

## API Overview

Auth
- POST /api/auth/register — create a new account
- POST /api/auth/login — login and get a token
- GET /api/auth/me — get logged in user info

Customers
- GET /api/customers — list all customers
- POST /api/customers — add a new customer
- GET /api/customers/:id — get one customer
- PUT /api/customers/:id — update customer
- DELETE /api/customers/:id — delete customer

Cases
- GET /api/cases — list all cases
- POST /api/cases — create a new case
- PATCH /api/cases/:id — update case status
- DELETE /api/cases/:id — delete a case

Dashboard
- GET /api/dashboard/stats — get overall system stats

All routes except login and register require a Bearer token in the Authorization header.

---

## Notes

Passwords are hashed before saving to the database. Roles supported are admin, manager, and agent — each with different levels of access.