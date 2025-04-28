import React, { createContext, useState, useEffect } from 'react';
import { fetchCart, addToCart, removeFromCart, fetchTutorials, fetchServices, createPurchase } from '../services/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [services, setServices] = useState([]);

  const loadCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const items = await fetchCart(token);
        setCartItems(items);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const loadItems = async () => {
    try {
      const [tutorialsData, servicesData] = await Promise.all([
        fetchTutorials(),
        fetchServices(),
      ]);
      setTutorials(tutorialsData);
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    loadCart();
    loadItems();
  }, []);

  const addItemToCart = async (itemType, itemId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please log in to add items to cart.');
        return;
      }
      const cartItem = { item_type: itemType, item_id: itemId, quantity: 1 };
      const addedItem = await addToCart(cartItem, token);
      setCartItems([...cartItems, addedItem]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeItemFromCart = async (cartItemId) => {
    try {
      const token = localStorage.getItem('authToken');
      await removeFromCart(cartItemId, token);
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const checkout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      for (const item of cartItems) {
        const details = item.item_type === 'tutorial'
          ? tutorials.find((t) => t.id === item.item_id)
          : services.find((s) => s.id === item.item_id);
        if (details) {
          await createPurchase({
            item_type: item.item_type,
            item_id: item.item_id,
            quantity: item.quantity,
            total_price: details.price * item.quantity,
            purchase_date: new Date().toISOString().split('T')[0],
          }, token);
          await removeFromCart(item.id, token);
        }
      }
      setCartItems([]);
      alert('Checkout successful!');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed.');
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, checkout, tutorials, services }}>
      {children}
    </CartContext.Provider>
  );
};