import React, { useState } from 'react';
import ProductModal from './ProductModal';

function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-4" />
        <h3 className="text-xl font-semibold mb-2">{product.name} ({product.type})</h3>
        <p className="text-gray-300 mb-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mb-2">Posted: {product.posted_date}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Read More
        </button>
      </div>
      {isModalOpen && <ProductModal product={product} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default ProductCard;