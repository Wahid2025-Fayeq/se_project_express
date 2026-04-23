WTWR App (What to Wear)
Project Description
The WTWR (What to Wear) app is a full-stack application that helps users decide what to wear based on weather conditions. Users can add, view, like, and delete clothing items, and categorize them depending on whether the weather is hot, warm, or cold.
This project focuses on building a backend server using Node.js and Express, creating a RESTful API, and working with a MongoDB database.

---

The API supports:

User registration and authentication (JWT-based)
Creating, retrieving, updating, and deleting clothing items
Liking and disliking clothing items
Authorization to ensure users can only modify their own data

---

Functionality

User Features
• Sign up (POST /signup)
• Sign in (POST /signin)
• Get current user (GET /users/me)
• Update profile (PATCH /users/me)

Clothing Items
• Get all items (GET /items) — public
• Create item (POST /items) — protected
• Delete item (DELETE /items/:itemId) — owner only
• Like item (PUT /items/:itemId/likes)
• Dislike item (DELETE /items/:itemId/likes)

Authorization
• JWT-based authentication
• Protected routes require Authorization: Bearer <token>
• Users cannot delete items created by others (403 protection)

---

Technologies Used
• JavaScript (ES6+)
• Node.js
• Express.js
• MongoDB
• Mongoose
• REST API
• bcryptjs — password hashing
• JWT (jsonwebtoken) — authentication
• cors — cross-origin requests configured
• Git & GitHub
• Postman (for API testing)

---

Security Features
• Passwords are hashed using bcrypt
• Password field is hidden (select: false)
• JWT tokens used for secure authentication
• Authorization middleware protects routes
• Ownership validation for deleting items

---

Techniques & Concepts
• RESTful routing (GET, POST, DELETE)
• CRUD operations
• Middleware usage
• Error handling (400, 404, 500)
• Schema and model creation with Mongoose
• Modular backend structure (routes, controllers, models)
• Working with JSON data

---

Project Structure
• /models — database schemas
• /controllers — business logic
• /routes — API routes
• /utils — helper functions and error handling

---

Future Improvements
• Add user authentication (JWT)
• Add authorization (protect routes)
• Connect frontend with backend
• Deploy project online
• Improve validation and security

---

API Endpoints Example
• GET /items — get all items
• POST /items — create new item
• DELETE /items/ — delete item
• PUT /items//likes — like item
• DELETE /items//likes — unlike item

---

Video Demo
Link:

Author
Wahid Fayeq
