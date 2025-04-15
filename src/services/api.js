import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/inventory';

export const fetchInventory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};