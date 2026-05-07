# 🚀 CRM Backend System

A robust, scalable, and secure Customer Relationship Management (CRM) backend built with Node.js, Express, and MongoDB.

---

## 📁 Project Structure

```
crm-backend/
│
├── app/
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── customerController.js
│   │   ├── caseController.js
│   │   └── userController.js
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Customer.js
│   │   └── Case.js
│   ├── routes/              # API route definitions
│   │   ├── authRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── caseRoutes.js
│   │   ├── userRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/          # Auth, error handling
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── services/            # Business services
│       └── dashboardService.js
├── config/
│   └── db.js                # MongoDB connection
├── tests/
│   └── auth.test.js         # Unit/integration tests
├── docs/
│   └── API.md               # API documentation
├── .env.example             # Environment template
├── .gitignore
├── jest.config.js
├── package.json
└── server.js                # Entry point
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)
- Postman (for API testing)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/crm-backend.git
cd crm-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```
Edit `.env` with your values:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/crm_db
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 4. Start the Server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

Server starts at: `http://localhost:5000`

---

## 🔑 Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login & get token | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Customers
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/customers` | List all customers | Yes |
| POST | `/api/customers` | Create customer | Yes |
| GET | `/api/customers/:id` | Get customer by ID | Yes |
| PUT | `/api/customers/:id` | Update customer | Yes |
| PATCH | `/api/customers/:id` | Partial update | Yes |
| DELETE | `/api/customers/:id` | Delete customer | Admin/Manager |

### Cases
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cases` | List all cases | Yes |
| POST | `/api/cases` | Create case | Yes |
| GET | `/api/cases/:id` | Get case by ID | Yes |
| PUT | `/api/cases/:id` | Update case | Yes |
| PATCH | `/api/cases/:id` | Partial update | Yes |
| DELETE | `/api/cases/:id` | Delete case | Admin/Manager |

### Users (Admin)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | List all users | Admin/Manager |
| GET | `/api/users/:id` | Get user by ID | Yes |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Dashboard
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/dashboard/stats` | System-wide stats | Yes |

---

## 🧪 Running Tests

```bash
npm test
```

---

## 🛡️ Security Features

- **Password Hashing** — bcryptjs with salt rounds
- **JWT Authentication** — Stateless token-based auth
- **Role-Based Access Control** — admin / manager / agent
- **Input Validation** — Mongoose schema validators
- **Centralized Error Handling** — Clean, consistent error responses

---

## 👤 User Roles

| Role | Permissions |
|------|-------------|
| `admin` | Full access including delete & user management |
| `manager` | Create, read, update; delete customers/cases |
| `agent` | Create, read, update own resources |
