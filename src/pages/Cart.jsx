import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartCard from '../components/CartCard';

function Cart() {
  const {
    cartItems,
    removeItemFromCart,
    checkout,
    tutorials,
    services,
    pendingRequests,
    showCartCard,
    confirmAddToCart,
    cancelAddToCart,
    updateItemQuantity,
  } = useContext(CartContext);

  const getItemDetails = (itemType, itemId) => {
    if (itemType === 'tutorial') {
      return tutorials.find((t) => t.id === itemId);
    } else if (itemType === 'service') {
      return services.find((s) => s.id === itemId);
    }
    return null;
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const details = getItemDetails(item.item_type, item.item_id);
        return total + (details ? details.price * item.quantity : 0);
      }, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (cartItemId, delta) => {
    const item = cartItems.find((i) => i.id === cartItemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      updateItemQuantity(cartItemId, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Request Notification Panel */}
      {pendingRequests > 0 && (
        <div className="fixed top-4 left-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
          <span>{pendingRequests} Pending Request{pendingRequests > 1 ? 's' : ''}</span>
          <span className="bg-white text-blue-500 rounded-full px-2 py-1 text-sm">
            {pendingRequests}
          </span>
        </div>
      )}

      {/* Cart Header */}
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <p className="text-gray-400 text-lg">Your cart is empty.</p>
          <a
            href="/"
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const details = getItemDetails(item.item_type, item.item_id);
            if (!details) return null;
            return (
              <div
                key={item.id}
                className="bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-700 transition"
              >
                <div className="flex items-center space-x-4">
                  {details.image && (
                    <img
                      src={details.image}
                      alt={details.name || details.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">
                      {details.name || details.title} ({item.item_type})
                    </h2>
                    <p className="text-gray-400">
                      Price: ${details.price?.toFixed(2) || 'N/A'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <label className="text-gray-400">Quantity:</label>
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-500"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${calculateTotal()}</p>
            <button
              onClick={checkout}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* CartCard Modal */}
      {showCartCard && (
        <CartCard
          item={showCartCard}
          onConfirm={confirmAddToCart}
          onCancel={cancelAddToCart}
        />
      )}
    </div>
  );
}

export default Cart;