# 🎯 Goals API

A robust and secure RESTful API for managing personal goals and milestones. Designed with scalability, security, and modern development best practices in mind.

This API provides user authentication, goal tracking, and milestone management — ideal for building goal-oriented productivity platforms or personal project management tools.

🌐 **Base URL**: [https://goals-api-q87s.onrender.com](https://goals-api-q87s.onrender.com)  
📘 Append endpoint paths (like `/api/goals`) to access the API.  
📘 **To use the API, check the documentation below.**  

> 📖 Full Public Documentation - [Goals API Docs](https://github.com/techlead-1/goals-api-docs)  


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
            "_id": "user_id",
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
            "_id": "user_id",
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
              "_id": "user_id",
              "name": "Jane Doe",
              "email": "jane@example.com",
              "profession": "Software Engineer"
            }
  }
```

### Update Profile
**Endpoint:** `PUT /api/v1/users/me`  
**Description:** Creates user goal.  

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
            "_id": "user_id",
            "name": "Jane Doe",
            "email": "jane@example.com",
            "profession": "Software Engineer"
          }
}
```

## 🎯 Goals

---

### Create Goal
**Endpoint:** `POST /api/v1/goals`  
**Description:** Creates user goals auto associated with the user behind the scenes.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Request Body
```json
  {
    "name": "Lose 10kg", // Required, trimmed string
    "category": "fitness", // Required, must be one of the enum values ['career', 'health', 'fitness', 'relationships', 'finance', 'travel', 'vacation', 'fun', 'business']
    "description": "Personal fitness goal to lose weight and get in shape", // Optional, trimmed string
    "start_date": "2025-04-01T00:00:00Z", // Optional, must be <= end_date if present
    "end_date": "2025-06-30T00:00:00Z", // Optional, must be >= start_date if present
    "status": "in-progress", // Required, must be one of ['in-progress', 'done', 'failed', 'archived'], default = 'in-progress'
  }
```

#### Response Body
```json
 {
   "goal": {
              "_id": "goal_id",
              "name": "Lose 10kg", 
              "category": "fitness", 
              "description": "Personal fitness goal to lose weight and get in shape",
              "start_date": "2025-04-01T00:00:00Z", 
              "end_date": "2025-06-30T00:00:00Z", 
              "status": "in-progress", 
              "userID": "66103ae82c9c0ad2cdaed442"
            }
}
```


### Get All Goals
**Endpoint:** `GET /api/v1/goals`  
**Description:** Get all user goals associated to this user, return an array of JSON.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Response Body
```json
 {
   "goals": [
              {
                "_id": "goal_id",
                "name": "Lose 10kg", 
                "category": "fitness", 
                "description": "Personal fitness goal to lose weight and get in shape",
                "start_date": "2025-04-01T00:00:00Z", 
                "end_date": "2025-06-30T00:00:00Z", 
                "status": "in-progress", 
                "userID": "66103ae82c9c0ad2cdaed442"
              }
            ]
}
```


### Get Specific Goal
**Endpoint:** `GET /api/v1/goals/:goal_id`  
**Description:** Get a specific user goal.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Response Body
```json
 {
   "goal": {
              "_id": "goal_id",
              "name": "Lose 10kg", 
              "category": "fitness", 
              "description": "Personal fitness goal to lose weight and get in shape",
              "start_date": "2025-04-01T00:00:00Z", 
              "end_date": "2025-06-30T00:00:00Z", 
              "status": "in-progress", 
              "userID": "66103ae82c9c0ad2cdaed442"
            }
}
```


### Update Goal
**Endpoint:** `PUT /api/v1/goals/:goal_id`  
**Description:** Update a specific user goal.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Request Body
```json
  {
    "name": "Lose 10kg",
    "category": "fitness",
    "description": "Personal fitness goal to lose weight and get in shape", 
    "start_date": "2025-04-01T00:00:00Z", 
    "end_date": "2025-06-30T00:00:00Z", 
    "status": "in-progress", 
  }
```

#### Response Body
```json
{
  "goal": {
            "_id": "goal_id",
            "name": "Lose 10kg", 
            "category": "fitness", 
            "description": "Personal fitness goal to lose weight and get in shape",
            "start_date": "2025-04-01T00:00:00Z", 
            "end_date": "2025-06-30T00:00:00Z", 
            "status": "in-progress", 
            "userID": "66103ae82c9c0ad2cdaed442"
          }
}
```


### Delete Goal
**Endpoint:** `DELETE /api/v1/goals/:goal_id`  
**Description:** Delete a specific user goal.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Response Body
```
  status: 200,
  message: "Deleted goal successfully."
```

## 🎉 Milestones

---

### Create Goal Milestone
**Endpoint:** `POST /api/v1/goals/:goal_id/milestones`  
**Description:** Creates milestone for a user goal.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Request Body
```json
  {
    "name": "Join Gym", // Required, trimmed string
    "description": "Sign up for gym membership and trainer at a close gym", // Optional, trimmed string
    "status": "in-progress", // Required, must be one of ['in-progress', 'done', 'failed', 'archived'], default = 'in-progress'
  }
```

#### Response Body
```json
 {
   "milestone": {
                  "_id": "milestone_id",
                  "name": "Join Gym", 
                  "description": "Sign up for gym membership and trainer at a close gym", 
                  "status": "in-progress",
                  "userID": "user_id",
                  "goalID": "goal_id"
                }
}
```


### Get All Goal Milestones
**Endpoint:** `GET /api/v1/goals/:goal_id/milestones`  
**Description:** Get all milestones of a specific goal, return an array of JSON.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Response Body
```json
 {
   "milestones": [
              {
                "_id": "milestone_id",
                "name": "Join Gym", 
                "description": "Sign up for gym membership and trainer at a close gym", 
                "status": "in-progress",
                "userID": "user_id",
                "goalID": "goal_id"
              }
            ]
}
```


### Get Specific Milestone
**Endpoint:** `GET /api/v1/goals/milestones/:milestone_id`  
**Description:** Get a specific milestone.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Response Body
```json
 {
   "milestone": {
                  "_id": "milestone_id",
                  "name": "Join Gym", 
                  "description": "Sign up for gym membership and trainer at a close gym", 
                  "status": "in-progress",
                  "userID": "user_id",
                  "goalID": "goal_id"
                }
}
```


### Update Milestone
**Endpoint:** `PUT /api/v1/goals/milestones/:milestone_id`  
**Description:** Update a specific milestone.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Request Body
```json
  {
    "name": "Join Gym",
    "description": "Sign up for gym membership and trainer at a close gym", 
    "status": "in-progress",
  }
```

#### Response Body
```json
{
  "milestone": {
                  "_id": "milestone_id",
                  "name": "Join Gym", 
                  "description": "Sign up for gym membership and trainer at a close gym", 
                  "status": "in-progress",
                  "userID": "user_id",
                  "goalID": "goal_id"
                }
}
```


### Delete Milestone
**Endpoint:** `DELETE /api/v1/goals/milestones/:milestone_id`  
**Description:** Delete a specific user goal.  

🔒 **Protected Route** — Requires a valid JWT token in the request header.

#### Response Body
```
  status: 200,
  message: "Deleted milestone successfully."
```
.  
.  
.  
.  

<h2 align="center">📬 Contact Me</h2>

<p align="center">
  <b>Have a startup idea, collab offer, or just want to say hey?</b><br />
  I'm always open to great convos and bold opportunities.
</p>

<p align="center">
  🔗 <a href="https://www.linkedin.com/in/mike-lead/">LinkedIn</a> &nbsp;|&nbsp;
  🌐 <a href="https://thestartupdev.com">Website</a> &nbsp;|&nbsp;
  📧 <a href="mailto:adesanya1ademola@gmail.com">adesanya1ademola@gmail.com</a>
</p>

<p align="center">
  <i>Let’s build something legendary.</i> 🚀
</p>


