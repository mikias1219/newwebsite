import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const loginAdmin = async (credentials) => {
  const response = await axios.post(`${API_URL}/admin/login`, credentials);
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const addProduct = async (formData) => {
  const response = await axios.post(`${API_URL}/products`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const fetchBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const addBlog = async (blog) => {
  const response = await axios.post(`${API_URL}/blogs`, blog);
  return response.data;
};

export const addProductBlog = async (blog) => {
  const response = await axios.post(`${API_URL}/blogs`, blog);
  return response.data;
};