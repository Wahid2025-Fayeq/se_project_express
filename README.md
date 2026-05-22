# WTWR App (What to Wear)

Project Description

The WTWR (What to Wear) app is a full-stack application that helps users decide what to wear based on current weather conditions. Users can create accounts, add, view, like, and delete clothing items, and categorize them based on whether the weather is hot, warm, or cold.

The project is built using Node.js, Express.js, MongoDB, and Mongoose, and features a RESTful API with JWT-based authentication and authorization. It includes secure user registration and login, protected routes, profile management, clothing item ownership validation, and full frontend–backend integration. The application is deployed online and follows modern validation and security practices.

---

The API supports:

User registration and authentication (JWT-based)
Creating, retrieving, updating, and deleting clothing items
Liking and disliking clothing items
Authorization to ensure users can only modify their own data

---

Functionality

User Features
• Sign up and sign in with JWT authentication  
• View current user profile  
• Update user profile information

Clothing Items
• View all clothing items  
• Create new clothing items  
• Delete owned clothing items  
• Like and dislike clothing items

Authorization
• Protected routes for authenticated users  
• Ownership validation for deleting items  
• JWT-based secure authentication

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

Implemented Features
• JWT-based user authentication
• Route authorization and protected endpoints
• Frontend and backend integration
• Online deployment
• Enhanced validation and security

---

API Endpoints Example

Clothing Items
• GET /items — Get all clothing items  
• POST /items — Create a new clothing item  
• DELETE /items/:itemId — Delete a clothing item (owner only)  
• PUT /items/:itemId/likes — Like a clothing item  
• DELETE /items/:itemId/likes — Remove like from a clothing item

Users
• POST /signup — Register a new user  
• POST /signin — Log in a user  
• GET /users/me — Get current user profile  
• PATCH /users/me — Update current user profile

---

Future Enhancements

• Password reset and email verification  
• Profile image upload support  
• Automated testing with Jest and Supertest  
• Improved UI/UX and mobile responsiveness

---

Domain name:(https://www.mine.bz.jumpingcrab.com)

Frontend GitHub repo Link: https://github.com/Wahid2025-Fayeq/se_project_react

Project Pitch Video

Check out this video: https://www.loom.com/share/e0f66026b99e47d6a052c4d6d9be89ae, where I describe my
project and some challenges I faced while building it.

Author
Wahid Fayeq
