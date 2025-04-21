import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Inventory</h1>
      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.length === 0 ? (
            <p className="text-gray-300">No products available.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Inventory;