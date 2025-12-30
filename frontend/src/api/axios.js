import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8880/api',
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor - add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('🔹 Axios Request Interceptor');
        console.log('URL:', config.baseURL + config.url);
        console.log('Token exists:', !!token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Token added to request:', token.substring(0, 20) + '...');
        } else {
            console.log('⚠️ No token found in localStorage');
        }

        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => {
        console.log('✅ Axios Response Success');
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        return response;
    },
    (error) => {
        console.error('❌ Axios Response Error');
        console.error('Status:', error.response?.status);
        console.error('Status Text:', error.response?.statusText);
        console.error('Data:', error.response?.data);
        console.error('Message:', error.message);

        // If unauthorized, clear token
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log('🚫 Unauthorized - clearing token');
            localStorage.removeItem('token');
        }

        return Promise.reject(error);
    }
);

export default api;