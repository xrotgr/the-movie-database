import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

export const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
});
