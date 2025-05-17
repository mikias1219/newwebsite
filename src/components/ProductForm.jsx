import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    if (!initialData) resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      price: '',
      description: '',
      image: '',
      posted_date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-2xl space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">Select Type</option>
            <option value="physical">Physical Product</option>
            <option value="digital">Digital Product</option>
            <option value="service">Service</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full pl-8 p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Date</label>
          <input
            type="date"
            value={formData.posted_date}
            onChange={(e) => setFormData({ ...formData, posted_date: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px]"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Image URL</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex justify-end gap-4">
        {initialData && (
          <button
            type="button"
            onClick={clearEdit}
            className="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 text-white transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-400 text-white transition-colors"
        >
          {initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </motion.form>
  );
}

export default ProductForm;