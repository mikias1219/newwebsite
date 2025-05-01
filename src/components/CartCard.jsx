import React from 'react';

function CartCard({ item, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4 text-white">Added to Cart</h3>
        <div className="bg-gray-700 p-4 rounded mb-4">
          <p className="text-white">{item.title || item.name}</p>
          <p className="text-gray-300">Price: ${item.price.toFixed(2)}</p>
          <p className="text-gray-300">Quantity: 1</p>
          {item.image && (
            <img src={item.image} alt={item.title || item.name} className="w-24 h-24 object-cover mt-2 rounded" />
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;