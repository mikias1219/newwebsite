import React, { useState } from 'react';
import ProductModal from './ProductModal';
import { motion } from 'framer-motion';

function ProductCard({ item, itemType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] group"
      >
        <div className="relative overflow-hidden rounded-lg aspect-video">
          <img
            src={item.image || '/placeholder.jpg'}
            alt={item.title || item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white line-clamp-1">
              {item.title || item.name}
            </h3>
            <span className="px-2 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full">
              {itemType === 'product' ? item.type : item.category}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-blue-400">
              ${item.price?.toFixed(2) || 'N/A'}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(item.posted_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
        >
          View Details
        </button>
      </motion.div>

      {isModalOpen && (
        <ProductModal 
          item={item} 
          itemType={itemType} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default ProductCard;