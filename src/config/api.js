import axios from "axios";

const backend_connection = axios.create(
    {
        baseURL: process.env.REACT_APP_BACK_BASE_URL,
        headers: {
            'Content-type': 'application/json',
        }
    }
);

export default backend_connection;