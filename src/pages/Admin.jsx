
import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

function Admin({ products, setProducts, blogs, setBlogs }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isAuthenticated ? (
        <AdminDashboard products={products} setProducts={setProducts} blogs={blogs} setBlogs={setBlogs} />
      ) : (
        <AdminLogin setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default Admin;
