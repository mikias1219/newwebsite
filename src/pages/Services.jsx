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
  const { user } = useContext(AuthContext);
  const { addItemToCart } = useContext(CartContext);

  const loadServices = async () => {
    try {
      const data = await fetchServices();
      const filtered = category
        ? data.filter((s) => s.category.toLowerCase() === category.toLowerCase())
        : data;
      setServices(filtered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Maintenance Services {category ? ` - ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''}
      </h1>
      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {services.length === 0 ? (
            <p className="text-gray-300">No services available.</p>
          ) : (
            services.map((service) => (
              <div key={service.id} className="relative">
                <ProductCard item={service} itemType="service" />
                {user && !user.is_admin && (
                  <button
                    onClick={() => addItemToCart('service', service.id)}
                    className="absolute bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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