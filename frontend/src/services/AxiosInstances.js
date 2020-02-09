import axios from 'axios';

export const backend = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL
    baseURL: process.env.REACT_APP_MOCK_URL
});

// backend.defaults.headers.post['Authorization'] = `Bearer ${auth.getToken()}`;
backend.interceptors.response.use(response => response.data);
