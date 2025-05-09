import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, initialData, clearEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    image: '',
    posted_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
    });
    if (!initialData) {
      setFormData({
        name: '',
        type: '',
        price: '',
        description: '',
        image: '',
        posted_date: new Date().toISOString().split('T')[0],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Type</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Price</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          rows="4"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Image URL</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {initialData ? 'Update' : 'Create'} Product
        </button>
        {initialData && (
          <button
            type="button"
            onClick={clearEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;