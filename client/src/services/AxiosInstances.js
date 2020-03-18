import axios from 'axios';

export const backend = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL
});

// backend.defaults.headers.post['Authorization'] = `Bearer `;
backend.interceptors.response.use(response => response.data);
