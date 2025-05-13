import React, { createContext, useState, useEffect } from 'react';
import {
  fetchCart, addToCart, removeFromCart, fetchTutorials, fetchServices, createPurchase, fetchRequests, updateCartItem
} from '../services/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [services, setServices] = useState([]);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [notification, setNotification] = useState(null);
  const [showCartCard, setShowCartCard] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const items = await fetchCart(token);
        setCartItems(items);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      showNotification('Failed to load cart. Please check your connection or login again.', 'error');
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
      showNotification('Failed to load items.', 'error');
    }
  };

  const loadPendingRequests = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const requests = await fetchRequests(token);
        const pendingCount = requests.filter((req) => req.status === 'pending').length;
        setPendingRequests(pendingCount);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    loadCart();
    loadItems();
    loadPendingRequests();
  }, []);

  const addItemToCart = async (itemType, itemId, itemDetails) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        showNotification('Please log in to add items to cart.', 'error');
        return;
      }
      setShowCartCard({ itemType, itemId, ...itemDetails });
    } catch (error) {
      console.error('Error preparing to add to cart:', error);
      showNotification('Error adding to cart.', 'error');
    }
  };

  const confirmAddToCart = async (item) => {
    if (!showCartCard) return;
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        showNotification('Please log in to add items to cart.', 'error');
        return;
      }
      const existingItem = cartItems.find(
        (i) => i.item_type === showCartCard.itemType && i.item_id === showCartCard.itemId
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + item.quantity;
        await updateCartItem(existingItem.id, { quantity: newQuantity }, token);
        setCartItems(
          cartItems.map((i) =>
            i.id === existingItem.id ? { ...i, quantity: newQuantity } : i
          )
        );
      } else {
        const cartItem = {
          item_type: showCartCard.itemType,
          item_id: showCartCard.itemId,
          quantity: item.quantity,
        };
        const addedItem = await addToCart(cartItem, token);
        setCartItems([...cartItems, addedItem]);
      }
      setShowCartCard(null);
      showNotification(`Added ${item.quantity} item${item.quantity > 1 ? 's' : ''} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification(
        error.response?.data?.detail || 'Error adding to cart. Please check your connection or login again.',
        'error'
      );
    }
  };

  const cancelAddToCart = () => {
    setShowCartCard(null);
    showNotification('Item not added to cart.', 'info');
  };

  const updateItemQuantity = async (cartItemId, quantity) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        showNotification('Please log in to update cart.', 'error');
        return;
      }
      await updateCartItem(cartItemId, { quantity }, token);
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
      showNotification('Quantity updated!');
    } catch (error) {
      console.error('Error updating quantity:', error);
      showNotification(
        error.response?.data?.detail || 'Error updating quantity. Please check your connection or login again.',
        'error'
      );
    }
  };

  const removeItemFromCart = async (cartItemId) => {
    try {
      const token = localStorage.getItem('authToken');
      await removeFromCart(cartItemId, token);
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
      showNotification('Item removed from cart!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      showNotification(
        error.response?.data?.detail || 'Error removing from cart.',
        'error'
      );
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
      showNotification('Checkout successful!');
    } catch (error) {
      console.error('Error during checkout:', error);
      showNotification(
        error.response?.data?.detail || 'Checkout failed.',
        'error'
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        confirmAddToCart,
        cancelAddToCart,
        removeItemFromCart,
        updateItemQuantity,
        checkout,
        tutorials,
        services,
        pendingRequests,
        showCartCard,
      }}
    >
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === 'success'
              ? 'bg-green-500'
              : notification.type === 'error'
              ? 'bg-red-500'
              : 'bg-blue-500'
          } text-white`}
        >
          {notification.message}
        </div>
      )}
      {children}
    </CartContext.Provider>
  );
};