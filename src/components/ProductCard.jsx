import React, { useState } from 'react';
import ProductModal from './ProductModal';

function ProductCard({ item, itemType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
        <img
          src={item.image || '/products/placeholder.jpg'}
          alt={item.title || item.name}
          className="w-full h-40 object-cover rounded mb-4"
        />
        <h3 className="text-lg font-semibold mb-2 text-white">
          {item.title || item.name}{' '}
          {itemType === 'product' ? `(${item.type})` : `(${item.category})`}
        </h3>
        <p className="text-gray-300 mb-2">${item.price?.toFixed(2) || 'N/A'}</p>
        <p className="text-sm text-gray-500 mb-4">
          Posted: {item.posted_date ? new Date(item.posted_date).toLocaleDateString() : 'N/A'}
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Read More
        </button>
      </div>
      {isModalOpen && (
        <ProductModal item={item} itemType={itemType} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default ProductCard;