import React, { useState } from 'react';
import ProductModal from './ProductModal';

function ProductCard({ item, itemType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition">
        <img
          src={item.image || '/products/placeholder.jpg'}
          alt={item.name}
          className="w-full h-40 object-cover rounded mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">
          {item.name} {itemType === 'product' ? `(${item.type})` : `(${item.category})`}
        </h3>
        <p className="text-gray-300 mb-2">${item.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mb-2">Posted: {item.posted_date}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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