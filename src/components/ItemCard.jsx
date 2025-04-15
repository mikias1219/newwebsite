import React from 'react';

function ItemCard({ item }) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">Quantity: {item.quantity}</p>
        <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
      </div>
    );
  }
  
  export default ItemCard;