import React from 'react';

function ProductModal({ item, itemType, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">
          {item.name} {itemType === 'product' ? `(${item.type})` : `(${item.category})`}
        </h2>
        <img
          src={item.image || '/products/placeholder.jpg'}
          alt={item.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <p className="text-lg mb-2">Price: ${item.price.toFixed(2)}</p>
        <p className="text-gray-300 mb-4">{item.description}</p>
        {item.video_url && (
          <div className="mb-4">
            <iframe
              width="100%"
              height="200"
              src={item.video_url}
              title={`${item.name} Tutorial`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <p className="text-sm text-gray-500 mb-4">Posted: {item.posted_date}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ProductModal;