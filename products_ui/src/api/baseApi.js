import axios from 'axios';

export  const baseApi = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['AUTH_TOKEN'] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export  const registerApi = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});