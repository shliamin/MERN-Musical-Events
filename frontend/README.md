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

## Contributing

Feel free to open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
