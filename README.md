# 🔐 Secure Connect & Communication Platform

A secure backend communication platform built using **Node.js, Express.js, MongoDB, Mongoose and Socket.IO**. The application provides JWT-based authentication, role-based access control, secure personal notes management and real-time communication.

## 🚀 Features

- **User Authentication:** Secure registration and login using JWT.
- **Password Security:** Password hashing using bcrypt.
- **Role-Based Access Control (RBAC):** Different permissions for regular users and administrators.
- **Secure Notes Management:** Create, read, update and delete personal notes.
- **Real-Time Communication:** Instant messaging using Socket.IO.
- **Socket Authentication:** JWT verification for socket connections.
- **Event Management:** EventEmitter for handling and logging chat activities.
- **Centralized Error Handling:** Consistent handling of application errors.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | Object Data Modeling (ODM) |
| JSON Web Token | Authentication |
| bcrypt | Password hashing |
| Socket.IO | Real-time communication |
| Nodemon | Development server |

## 📁 Project Structure

```text
Secure-Connect-Communication-Platform/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── noteController.js
│
├── events/
│   └── eventEmitter.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   └── noteRoutes.js
│
├── sockets/
│   └── chatSocket.js
│
├── .env.example
├── .gitignore
├── chat-test.js
├── package.json
└── server.js
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Aryantiwarii07/Secure-Connect-Communication-Platform.git
```

### 2. Navigate into the project

```bash
cd Secure-Connect-Communication-Platform
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/secureConnectDB
JWT_SECRET=your_secure_secret
JWT_EXPIRES_IN=1d
```

Configure your MongoDB connection and use a strong private JWT secret.

### 5. Start the development server

```bash
npm run dev
```

Server URL:

```text
http://localhost:5000
```

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |

### Notes Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/notes` | Create a note |
| GET | `/api/notes` | Retrieve personal notes |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

### Administration

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/dashboard` | Access admin dashboard |

**Note:** Protected endpoints require a valid JWT Bearer token. The administration endpoint requires the admin role.

## 💬 Real-Time Communication

The application uses Socket.IO for real-time messaging.

### Socket Events

| Event | Description |
|---|---|
| `connection` | Handles a new client connection |
| `send_message` | Sends a chat message |
| `receive_message` | Receives a broadcast message |
| `chat_error` | Reports invalid messages |
| `disconnect` | Handles client disconnection |

Authenticated users automatically join the `general` chat room.

### Testing Real-Time Chat

The project includes a `chat-test.js` file for testing communication between two authenticated users.

Configure the following PowerShell environment variables using fresh JWT tokens:

```powershell
$env:ARYAN_TOKEN="your_first_jwt_token"
$env:ROHAN_TOKEN="your_second_jwt_token"
```

Run:

```bash
node chat-test.js
```

## 🧪 Testing

The application was tested using Postman and a Socket.IO client.

Testing includes:

- User registration and login.
- JWT authentication.
- Unauthorized access rejection.
- Role-based access control.
- Notes CRUD operations.
- Real-time communication between two users.
- Socket connection authentication.
- EventEmitter activity logging.

## 🔒 Security

- JWT-based authentication.
- Password hashing.
- Protected API routes.
- Role-based authorization.
- Environment-based secret management.
- Validation of incoming chat messages.

## 👨‍💻 Author

**Aryan Tiwari**

B.Tech – Computer Science and Engineering (AI & ML)

GitHub: [Aryantiwarii07](https://github.com/Aryantiwarii07)

---

*Developed as a backend development project to demonstrate secure authentication, database management, API development and real-time communication.*
