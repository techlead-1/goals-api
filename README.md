# 🎯 Goals API

A robust and secure RESTful API for managing personal goals and milestones. Designed with scalability, security, and modern development best practices in mind.

This API provides user authentication, goal tracking, and milestone management — ideal for building goal-oriented productivity platforms or personal project management tools.

🟢 **Live Demo:** [https://goals-api-q87s.onrender.com](https://goals-api-q87s.onrender.com)  
📘 **To use the API, check the documentation below.**


### 🚀 Tech Stack

Built using modern backend tools and libraries:

- **Node.js** – JavaScript runtime for scalable backend logic
- **Express.js** – Fast, minimalist web framework for building APIs
- **MongoDB (Mongoose)** – NoSQL database for flexible data modeling
- **Arcjet** – Bot protection and rate limiting for API hardening
- **JWT** – JSON Web Tokens for stateless authentication and route protection
- **Bcrypt** – Secure password hashing and storage


### ✨ Features

#### 👤 User Management
- Register a new user profile
- Log in securely with JWT
- View and update your profile
- Passwords hashed with bcrypt for security

#### 🔐 Authentication & Security
- **JWT-based Authentication** for protected routes
- **Authorization Middleware** to control access
- **Rate Limiting & Bot Protection** powered by Arcjet

#### 🎯 Goals
- Create, read, update, and delete personal goals
- Organize progress into milestones

#### 🏁 Milestones
- Add and manage milestones for each goal
- Nested CRUD operations within goal context


### 📦 Use Case

This API is suitable for:
- Productivity apps
- Self-improvement tools
- Portfolio projects
- Goal-setting platforms

Designed to be lightweight yet extensible — a solid foundation for real-world backend systems.


### 📄 Status

✅ **Project Completed**  
This API is live and stable. Ready for integration, testing, or further extension.

---

## 📘 Documentation

### 🔐 Authentication

---

### Sign Up  
**Endpoint:** `POST /api/v1/auth/sign-up`  
**Description:** Creates a new user account.

#### Request Body

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword123",
  "profession": "Software Engineer" // optional
}
```

#### Response Body 

```json
{
  "token": "jwt_token",
  "user": {
            "id": "user_id",
            "name": "Jane Doe",
            "email": "jane@example.com",
            "profession": "Software Engineer"
          }
}
```

### Sign In  

**Endpoint:** `PUT /api/v1/auth/sign-in`  
**Description:** Authenticates a user and returns a JWT token.

#### Request Body
```json
{
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

#### Response Body
```json
{
  "token": "jwt_token",
  "user": {
            "id": "user_id",
            "name": "Jane Doe",
            "email": "jane@example.com",
            "profession": "Software Engineer"
          }
}
```

### Sign Out  
**Endpoint:** `DELETE /api/v1/auth/sign-out`  
**Description:** Logs the user out by invalidating the current session.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### 🧾 Headers
**Authorization: Bearer**

#### Response
```
  status: 200,
  message: "User logged out successfully."
```

### 👤 User Profile

--- 

### View Profile
**Endpoint:** `GET /api/v1/users/me`  
**Description:** Gets the user profile.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Response Body
```json
  {
    "user": {
              "id": "user_id",
              "name": "Jane Doe",
              "email": "jane@example.com",
              "profession": "Software Engineer"
            }
  }
```

### Update Profile
**Endpoint:** `PUT /api/v1/users/me`  
**Description:** Updates the user profile, only name and profession can be updated.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Request Body
```json
{
  "name": "Jane Doe",
  "profession": "Software Engineer"
}
```

#### Response Body
```json
{
  "user": {
            "id": "user_id",
            "name": "Jane Doe",
            "email": "jane@example.com",
            "profession": "Software Engineer"
          }
}
```
