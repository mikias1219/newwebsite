import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

export const loginAdmin = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const fetchProducts = async () => {
  const response = await api.get('/products/');
  return response.data;
};

export const createProduct = async (product, token) => {
  const response = await api.post('/products/', product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProduct = async (id, product, token) => {
  const response = await api.put(`/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProduct = async (id, token) => {
  const response = await api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchTutorials = async () => {
  const response = await api.get('/tutorials/');
  return response.data;
};

export const createTutorial = async (tutorial, token) => {
  const response = await api.post('/tutorials/', tutorial, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTutorial = async (id, tutorial, token) => {
  const response = await api.put(`/tutorials/${id}`, tutorial, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTutorial = async (id, token) => {
  const response = await api.delete(`/tutorials/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};