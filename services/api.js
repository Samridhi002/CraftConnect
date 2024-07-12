// src/services/api.js

import axios from 'axios';

const API_BASE_URL = process.env.API_URL || 'https://craftconnect-backend-1.onrender.com';
const API_KEY = process.env.API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  }
});
export async function getData() {
  const response = await fetch(`${API_URL}/home`);
  return response.json();
}

export const getProducts = () => api.get('/api/products');
export const getProduct = (id) => api.get(`/api/products/${id}`);
export const createProduct = (productData) => api.post('/api/products', productData);
export const updateProduct = (id, productData) => api.put(`/api/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/api/products/${id}`);

export default api;