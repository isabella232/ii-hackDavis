import axios from 'axios';

export const backend = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
    // baseURL: process.env.REACT_APP_MOCK_URL
});

// backend.defaults.headers.post['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTYwNGIwM2IwZWE4ODRkY2ZiNzM1ZWEiLCJpYXQiOjE1ODMzNjg5NjN9.pCKvYlS4VN_lyt3kzEmTZFlonaDO5rUNPL9VQOivlko`;
backend.interceptors.response.use(response => response.data);
