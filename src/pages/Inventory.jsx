import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchServices } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { addItemToCart } = useContext(CartContext);

  const loadData = async () => {
    try {
      const [productsData, servicesData] = await Promise.all([
        fetchProducts(),
        fetchServices(),
      ]);
      setProducts(productsData);
      setServices(servicesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Inventory</h1>
      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2 text-white">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {products.length === 0 ? (
              <p className="text-gray-300">No products available.</p>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} item={product} itemType="product" />
              ))
            )}
          </div>
          <h2 className="text-xl font-semibold mb-2 text-white">Services</h2>
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
        </>
      )}
    </div>
  );
}

export default Inventory;