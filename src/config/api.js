import axios from "axios";
import { getToken } from "../services/auth";


const backend_connection = axios.create(
    {
        baseURL: process.env.REACT_APP_BACK_BASE_URL,
        headers: {
            'Content-type': 'application/json',
        }
    }
);

backend_connection.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  });

export default backend_connection;