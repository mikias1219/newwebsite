import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchServices } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function Services() {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const { user } = useContext(AuthContext);
  const { addItemToCart } = useContext(CartContext);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await fetchServices();
      const filtered = category
        ? data.filter((s) => s.category.toLowerCase() === category.toLowerCase())
        : data;
      setServices(filtered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setNotification({ message: 'Failed to load services.', type: 'error' });
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [category]);

  // Show notification with timeout
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">
        Maintenance Services{' '}
        {category ? ` - ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <p className="text-gray-400">No services available.</p>
          ) : (
            services.map((service) => (
              <div key={service.id} className="relative">
                <ProductCard item={service} itemType="service" />
                {user && !user.is_admin && (
                  <button
                    onClick={() =>
                      addItemToCart('service', service.id, {
                        name: service.name,
                        price: service.price,
                        image: service.image,
                      })
                    }
                    className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Services;