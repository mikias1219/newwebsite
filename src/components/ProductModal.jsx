import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

function ProductModal({ item, itemType, onClose }) {
  const { user } = useContext(AuthContext);
  const { showModal } = useCart();

  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0` 
      : null;
  };

  const handleAddToCart = () => {
    showModal({
      id: item.id,
      name: item.title || item.name,
      price: item.price,
      image: item.image,
      type: itemType
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="p-6 space-y-6">
          {item.image && (
            <img
              src={item.image}
              alt={item.title || item.name}
              className="w-full h-64 object-cover rounded-xl"
            />
          )}

          {item.video_url && (
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={getYouTubeEmbedUrl(item.video_url)}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">
                {item.title || item.name}
              </h2>
              <span className="text-2xl font-bold text-blue-400">
                ${item.price?.toFixed(2)}
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {item.description || 'No description available.'}
            </p>

            {user && !user.is_admin && (
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductModal;