import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/login', new URLSearchParams({
    username: credentials.username,
    password: credentials.password,
  }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data;
};

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload-video/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getVideo = async (filename) => {
  const response = await api.get(`/media/${filename}`, {
    responseType: 'blob',
  });
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

export const fetchServices = async () => {
  const response = await api.get('/services/');
  return response.data;
};

export const createService = async (service, token) => {
  const response = await api.post('/services/', service, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateService = async (id, service, token) => {
  const response = await api.put(`/services/${id}`, service, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteService = async (id, token) => {
  const response = await api.delete(`/services/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchCart = async (token) => {
  const response = await api.get('/cart/', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addToCart = async (cartItem, token) => {
  const response = await api.post('/cart/', cartItem, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const removeFromCart = async (cartItemId, token) => {
  const response = await api.delete(`/cart/${cartItemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createPurchase = async (purchase, token) => {
  const response = await api.post('/purchases/', purchase, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchPurchases = async (token) => {
  const response = await api.get('/purchases/', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchRequests = async (token) => {
  const response = await api.get('/requests/', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createRequest = async (request, token) => {
  const response = await api.post('/requests/', request, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateRequest = async (id, request, token) => {
  const response = await api.put(`/requests/${id}`, request, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchYouTubeVideos = async (query) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: query,
      type: 'video',
      key: 'AIzaSyARfj3aWaEYErtEIrnuTVUBNOhgIJALxus',
    },
  });
  return response.data.items;
};