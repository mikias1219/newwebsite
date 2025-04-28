import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cartItems, removeItemFromCart, checkout, tutorials, services } = useContext(CartContext);

  const getItemDetails = (itemType, itemId) => {
    if (itemType === 'tutorial') {
      return tutorials.find((t) => t.id === itemId);
    } else if (itemType === 'service') {
      return services.find((s) => s.id === itemId);
    }
    return null;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const details = getItemDetails(item.item_type, item.item_id);
      return total + (details ? details.price * item.quantity : 0);
    }, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const details = getItemDetails(item.item_type, item.item_id);
            return details ? (
              <div key={item.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {details.name || details.title} ({item.item_type})
                  </h2>
                  <p className="text-gray-300">Price: ${details.price.toFixed(2)}</p>
                  <p className="text-gray-300">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : null;
          })}
          <div className="text-right">
            <p className="text-xl font-semibold text-white">Total: ${calculateTotal()}</p>
            <button
              onClick={checkout}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;