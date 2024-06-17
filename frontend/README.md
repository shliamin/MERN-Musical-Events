# MERN-Musical-Events Frontend

### Efim Shliamin

This frontend application is part of the MERN-Musical-Events project. It provides a user interface to interact with the backend APIs for managing users and musical event contacts. The frontend is built using React.js and utilizes Leaflet for displaying maps.

## Dependencies

- [React.js](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Leaflet](https://leafletjs.com/)
- [React-Leaflet](https://react-leaflet.js.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [uuid](https://www.npmjs.com/package/uuid)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/shliamin/MERN-Musical-Events.git
    cd MERN-Musical-Events/frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory with your API endpoint:
    ```env
    REACT_APP_BACKEND_URL=InsertYourAPI
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Usage

The frontend application provides the following features:

- **User Authentication**: Sign up and login.
- **User Contacts**: View, add, update, and delete musical event contacts.
- **Map View**: Display contacts on a map using Leaflet.

## Leaflet Integration

The application uses Leaflet to display maps and mark locations of musical events. Ensure you have configured the map settings and API keys if necessary.

## User Authentication on Frontend

### Overview

User authentication in this application is handled using a combination of React components, hooks, and context. The main component responsible for authentication is the `Auth` component, which provides both login and signup functionalities. The authentication process involves sending HTTP requests to the backend and managing authentication state within the frontend application.

### Components and Hooks

1. **Auth Component**
    - Located at: `src/users/pages/Auth.js`
    - This component renders the login and signup forms and handles the submission of user credentials.

2. **useHttpClient Hook**
    - Located at: `src/shared/hooks/http-hook.js`
    - This custom hook is used to send HTTP requests to the backend and manage loading and error states.

3. **AuthContext**
    - Located at: `src/shared/context/auth-context.js`
    - This context provides a global state for authentication, allowing other components to access and modify the authentication status of the user.

### Authentication Process

1. **Form Submission**
    - The `Auth` component renders a form that switches between login and signup modes.
    - When the form is submitted, the `authSubmitHandler` function is triggered.

2. **Sending Request**
    - The `authSubmitHandler` function uses the `useHttpClient` hook's `sendRequest` method to send an HTTP request to the backend.
    - Depending on the mode (login or signup), the request is sent to either the `/users/login` or `/users/signup` endpoint.

3. **Handling Response**
    - If the request is successful, the response contains the user ID.
    - The user ID is then used to log the user in by calling the `auth.login` method provided by the `AuthContext`.

4. **Managing State**
    - The `useHttpClient` hook manages the loading and error states during the HTTP request.
    - If an error occurs, it is displayed using the `ErrorModal` component.

### Example Code

Here is an example of how the `authSubmitHandler` function handles the authentication process:

```javascript
const authSubmitHandler = async event => {
  event.preventDefault();

  if (isLoginMode) {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.user.id);
    } catch (err) { }
  } else {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );

      auth.login(responseData.user.id);
    } catch (err) { }
  }
};
```

### Environment Variables

The backend URL is stored in an environment variable for flexibility and security. Ensure you have the following environment variable defined in your ```.env``` file:

```env
REACT_APP_BACKEND_URL=InsertYourAPI
```

This setup ensures that the frontend can interact with the backend to authenticate users securely and efficiently.

