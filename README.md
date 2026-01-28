# Task Management System (Intern Assignment)

A secure, clean, and simple full-stack task management application built with Node.js, Express, MongoDB, and React.

## Features
- **User Authentication**: Register and Login with hashed passwords (bcrypt).
- **JWT Authorization**: Secure routes using Bearer tokens.
- **RBAC (Role-Based Access Control)**: Different access levels for `user` and `admin`.
- **Task CRUD**: Create, Read, Update, and Delete tasks.
- **API Versioning**: All endpoints are prefixed with `/api/v1`.
- **Responsive UI**: Basic React dashboard for interacting with tasks.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React (Vite), Axios, React Router
- **Security**: bcryptjs, jsonwebtoken, CORS

## Project Structure
```text
project-root/
├── backend/
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controllers/  # API logic
│   │   ├── middleware/   # Auth & Role checks
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API endpoints
│   │   └── app.js        # Express entry point
│   └── .env              # Environment variables
└── frontend/
    ├── src/
    │   ├── api/          # Axios configuration
    │   ├── context/      # Authentication state
    │   ├── pages/        # UI Pages (Login, Register, Dashboard)
    │   └── App.jsx       # Routing logic
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running (or a remote URI)

### Backend Setup
1. Navigate to `backend/` folder.
2. Run `npm install`.
3. Create a `.env` file (if not already present) and add:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/intern-assignment
   JWT_SECRET=supersecretkey123
   NODE_ENV=development
   ```
4. Run the server: `npm run dev` (uses nodemon) or `node src/app.js`.

### Frontend Setup
1. Navigate to `frontend/` folder.
2. Run `npm install`.
3. Run the application: `npm run dev`.
4. Open your browser at `http://localhost:5173`.

## API Documentation

### Auth Endpoints
- `POST /api/v1/auth/register` - Register a new user.
- `POST /api/v1/auth/login` - Login and get JWT token.

### Task Endpoints (Requires JWT)
- `GET /api/v1/tasks` - Get all tasks (Admins see all, Users see their own).
- `POST /api/v1/tasks` - Create a new task.
- `GET /api/v1/tasks/:id` - Get a single task.
- `PUT /api/v1/tasks/:id` - Update a task.
- `DELETE /api/v1/tasks/:id` - Delete a task.

## Scalability Note
To scale this project in the future:
1. **Database Scaling**: Move to a managed MongoDB service (Atlas) and implement indexing on frequently queried fields (like `user` ID in tasks).
2. **Caching**: Introduce Redis to cache task data and reduce database load.
3. **Microservices**: Split Authentication and Task Management into separate services if the user base grows significantly.
4. **Load Balancing**: Deploy multiple instances of the backend using PM2 or Docker/Kubernetes with a Load Balancer (Nginx/AWS ELB).
5. **Security**: Move JWT from LocalStorage to HttpOnly cookies to prevent XSS attacks. Add rate limiting to prevent Brute Force attacks.
