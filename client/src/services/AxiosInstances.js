import axios from 'axios';

export const auth = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export const backend = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL
});

backend.interceptors.response.use(response => response.data);
