
# MERN-Musical-Events Backend

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

The backend server will run on `http://localhost:5001`. It provides the following API endpoints:

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

