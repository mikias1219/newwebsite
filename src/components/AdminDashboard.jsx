import React, { useState } from 'react';
import ProductForm from './ProductForm';
import TutorialForm from './TutorialForm';

function AdminDashboard({ products, setProducts, tutorials, setTutorials }) {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
          <button
            onClick={() => {
              localStorage.removeItem('authToken');
              window.location.reload();
            }}
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
            onClick={() => setActiveTab('tutorials')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'tutorials' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-blue-600 transition`}
          >
            Manage Tutorials
          </button>
        </div>
        {activeTab === 'products' ? (
          <ProductForm products={products} setProducts={setProducts} setTutorials={setTutorials} />
        ) : (
          <TutorialForm tutorials={tutorials} setTutorials={setTutorials} />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;