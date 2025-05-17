import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CartCard = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();

  const handleSubmit = () => {
    addItemToCart({
      ...item,
      quantity
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-gray-800 rounded-xl p-6 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Add to Cart</h3>
          
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h4 className="text-lg font-semibold text-white">{item.name}</h4>
              <p className="text-blue-400">${item.price?.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <span className="text-gray-300">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                -
              </button>
              <span className="text-white w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-8 h-8 rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Add {quantity} to Cart - ${(item.price * quantity).toFixed(2)}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartCard;