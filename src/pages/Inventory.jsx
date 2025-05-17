import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { fetchProducts, fetchServices } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const { user } = useContext(AuthContext);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, servicesData] = await Promise.all([
        fetchProducts(),
        fetchServices(),
      ]);
      setProducts(productsData);
      setServices(servicesData);
    } catch (err) {
      setError('Failed to load inventory. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProductSubmit = async (data) => {
    try {
      // Add API call here based on create/update
      loadData();
      setEditProduct(null);
    } catch (err) {
      setError('Failed to save product. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-red-500 text-center text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Inventory Management</h1>
          {user?.is_admin && (
            <button
              onClick={() => setEditProduct({})}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add New Product
            </button>
          )}
        </div>

        {editProduct !== null && (
          <ProductForm
            onSubmit={handleProductSubmit}
            initialData={editProduct}
            clearEdit={() => setEditProduct(null)}
          />
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-64 bg-gray-800 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    item={product} 
                    itemType="product"
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ProductCard 
                    key={service.id} 
                    item={service} 
                    itemType="service"
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Inventory;