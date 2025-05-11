import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import CartCard from './CartCard';

function ProductModal({ item, itemType, onClose }) {
  const { user } = useContext(AuthContext);
  const { addItemToCart, showCartCard, confirmAddToCart, cancelAddToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!user) {
      // Notification handled by CartContext
      addItemToCart(itemType, item.id, {
        name: item.name,
        title: item.title,
        price: item.price,
        image: item.image,
      });
      return;
    }
    addItemToCart(itemType, item.id, {
      name: item.name,
      title: item.title,
      price: item.price,
      image: item.image,
    });
  };

  // Convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId =
      url.split('v=')[1]?.split('&')[0] ||
      url.split('youtu.be/')[1]?.split('?')[0] ||
      url.split('youtube.com/shorts/')[1]?.split('?')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">{item.title || item.name}</h2>
          {item.image && (
            <img
              src={item.image}
              alt={item.title || item.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
          )}
          <p className="text-gray-300 mb-4">{item.content || item.description || 'No description available.'}</p>
          <p className="text-gray-300 mb-4">Price: ${item.price?.toFixed(2) || 'N/A'}</p>
          {item.video_url ? (
            <div className="mb-4">
              <iframe
                width="100%"
                height="315"
                src={getYouTubeEmbedUrl(item.video_url)}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : item.video_file ? (
            <div className="mb-4">
              <video width="100%" height="315" controls>
                <source
                  src={`http://localhost:8000/media/${item.video_file.split('/').pop()}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : null}
          <div className="flex justify-end space-x-2">
            {user && !user.is_admin && (
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {showCartCard && (
        <CartCard
          item={showCartCard}
          onConfirm={confirmAddToCart}
          onCancel={cancelAddToCart}
        />
      )}
    </>
  );
}

export default ProductModal;