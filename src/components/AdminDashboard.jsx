
import React, { useState } from 'react';
import ProductForm from './ProductForm';
import BlogForm from './BlogForm';

function AdminDashboard({ products, setProducts, blogs, setBlogs }) {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
          <button
            onClick={() => window.location.reload()} // Reload to logout (clears isAuthenticated)
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-blue-600 transition`}
          >
            Manage Products
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'blogs' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-blue-600 transition`}
          >
            Manage Blogs
          </button>
        </div>
        {activeTab === 'products' ? (
          <ProductForm products={products} setProducts={setProducts} setBlogs={setBlogs} />
        ) : (
          <BlogForm blogs={blogs} setBlogs={setBlogs} />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
