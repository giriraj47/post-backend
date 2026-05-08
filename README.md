# Posty - Scalable Post Management System

A full-stack application built for the Backend Developer Intern assignment. Features secure authentication, role-based access control (RBAC), and a robust CRUD system for managing posts.

## 🚀 Features

### Backend
- **Authentication**: Secure registration and login with password hashing (bcrypt) and JWT.
- **RBAC**: Role-based access control differentiating between `Admin` and `User`.
- **CRUD APIs**: Full Create, Read, Update, and Delete operations for the `Post` entity.
- **Security**: JWT tokens handled via secure, HTTP-only cookies.
- **Versioning**: API versioning implemented (`/api/v1`).
- **Database**: MongoDB integration with Mongoose ODM.

### Frontend
- **Modern UI**: Clean, responsive interface built with React and Vite.
- **Protected Routes**: Secure dashboard access using context-based authentication hooks.
- **Role-aware Dashboard**: Admin users have full management access, while regular users have read-only access.
- **Real-time Feedback**: Success and error messages for all user interactions.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt.
- **Frontend**: React.js, Vite, Axios, Context API.
- **Deployment Ready**: Modular structure designed for scalability.

## 📦 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and receive JWT cookie
- `POST /api/v1/auth/logout` - Clear auth cookie

### Posts
- `GET /api/v1/post/posts` - Fetch all posts (User/Admin)
- `POST /api/v1/post/create` - Create a new post (Admin only)
- `PATCH /api/v1/post/update/:postId` - Update a post (Admin only)
- `DELETE /api/v1/post/delete/:postId` - Delete a post (Admin only)

---

## 📈 Scalability Note

To ensure the system can handle growing traffic and data, the following strategies can be implemented:

1. **Horizontal Scaling**: Use a Load Balancer (like Nginx or AWS ELB) to distribute incoming requests across multiple instances of the Node.js application.
2. **Database Optimization**:
   - **Indexing**: Implement indexes on frequently queried fields (e.g., `email`, `username`) to speed up read operations.
   - **Sharding**: As the dataset grows, distribute data across multiple MongoDB shards.
3. **Caching**: Integrate **Redis** to cache frequently accessed data (like the post feed) to reduce the load on the primary database and improve response times.
4. **Microservices Architecture**: Decouple the `Auth` and `Post` modules into independent services. This allows each service to scale independently based on its specific load (e.g., scaling Auth service during high login traffic).
5. **Asynchronous Processing**: Use message queues (like RabbitMQ or BullMQ) for non-blocking tasks such as sending emails or processing uploaded images.
6. **Stateless Auth**: Since we use JWT, the application remains stateless, making it easier to scale horizontally without worrying about session synchronization across servers.
