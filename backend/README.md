# MERN-Musical-Events Backend

### Efim Shliamin

This backend application is part of the MERN-Musical-Events project. It provides RESTful APIs to manage users and musical event contacts. The backend is built using Node.js, Express.js, MongoDB, and uses the OpenCage Geocoding API for address-to-coordinates conversion.

## Dependencies

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express-validator](https://express-validator.github.io/)
- [uuid](https://www.npmjs.com/package/uuid)
- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://www.npmjs.com/package/nodemon) (for development)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/shliamin/MERN-Musical-Events.git
    cd MERN-Musical-Events/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory with your MongoDB and OpenCage API keys:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    OPENCAGE_API_KEY=your_opencage_api_key
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

The backend server provides the following API endpoints:

### Users

- **GET /api/users**: Retrieve all users.
- **POST /api/users/signup**: Create a new user.
- **POST /api/users/login**: Login a user.

### Contacts

- **GET /api/contacts/:cid**: Retrieve a contact by ID.
- **GET /api/contacts/user/:uid**: Retrieve all contacts for a user.
- **POST /api/contacts**: Create a new contact.
- **PATCH /api/contacts/:cid**: Update a contact by ID.
- **DELETE /api/contacts/:cid**: Delete a contact by ID.

## MongoDB

The application uses MongoDB to store user and contact data. Mongoose is used as the ORM to interact with the MongoDB database. Ensure you have a MongoDB cluster set up and provide the connection string in the `.env` file.

## OpenCage Geocoding

The backend uses the OpenCage Geocoding API to convert addresses to geographical coordinates (latitude and longitude). Make sure to sign up for an API key from [OpenCage](https://opencagedata.com/) and add it to the `.env` file.

## Authentication Mechanism

The application uses token-based authentication with JSON Web Tokens (JWT). Below is an explanation of how the authentication process works:

### User Registration (Sign Up)

1. The user provides their name, email, and password.
2. The backend creates a new user in the MongoDB database.
3. A JWT token is generated and sent back to the client.
4. The client stores the token for future use.

### User Login

1. The user provides their email and password.
2. The backend verifies the credentials.
3. If valid, a JWT token is generated and sent back to the client.
4. The client stores the token for future use.

### Token Storage

- The client stores the token in local storage or cookies to use for authenticated requests.

### Authorized Requests

1. For requests that require authentication, the client includes the JWT token in the `Authorization` header as `Bearer TOKEN`.
2. The backend verifies the token.
3. If the token is valid, the request is processed.
4. If the token is invalid, an error is returned.

### Code Implementation

#### Backend (Node.js/Express)

**User Registration:**

```javascript
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // Create user and generate token
  const token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_KEY, { expiresIn: '1h' });
  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};
```

**User Login:**

```javascript
const login = async (req, res, next) => {
  const { email, password } = req.body;
  // Verify credentials and generate token
  const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_KEY, { expiresIn: '1h' });
  res.json({ userId: existingUser.id, email: existingUser.email, token: token });
};
```

**Token Verification Middleware::**

```javascript
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 401);
    return next(error);
  }
};
```