import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

