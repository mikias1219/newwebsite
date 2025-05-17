import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchCart, addToCart, updateCartItem, removeFromCart 
} from '../services/api';
import { useToast } from '../App';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showAddModal, setShowAddModal] = useState(null);
  const { addToast } = useToast();

  const loadCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const data = await fetchCart(token);
        setCart(data);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      addToast({
        type: 'error',
        message: 'Cart Error',
        description: 'Failed to load cart items'
      });
    }
  };

  const handleCartAction = async (action, successMessage, ...args) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      await action(...args, token);
      await loadCart();
      addToast({
        type: 'success',
        message: successMessage
      });
    } catch (error) {
      console.error('Cart error:', error);
      addToast({
        type: 'error',
        message: 'Cart Error',
        description: error.response?.data?.detail || 'Failed to update cart'
      });
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart: (item) => setShowAddModal(item),
        updateItemQuantity: (id, quantity) => 
          handleCartAction(updateCartItem, 'Item updated', id, { quantity }),
        removeItem: (id) => handleCartAction(removeFromCart, 'Item removed', id),
        showAddModal,
        closeAddModal: () => setShowAddModal(null)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);