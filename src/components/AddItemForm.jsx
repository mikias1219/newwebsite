import React, { useState } from 'react';

function AddItemForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const posted_date = new Date().toISOString().split('T')[0];
    const newItem = {
      name,
      type,
      price: parseFloat(price),
      description,
      image: image || '/products/placeholder.jpg',
      posted_date,
    };

    try {
      await onAddItem(newItem);
      setMessage('Product added successfully!');
      setName('');
      setType('');
      setPrice('');
      setDescription('');
      setImage('');
      setError('');
    } catch (err) {
      setError('Failed to add product');
    }

    setTimeout(() => {
      setMessage('');
      setError('');
    }, 3000);
  };

  return (
    <div className="mb-8 bg-gray-700 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Product</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Product Name</label>
          <input
            type="text"
            placeholder="e.g., PlayStation 5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Type</label>
          <input
            type="text"
            placeholder="e.g., Standard, Slim"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Price ($)</label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g., 499.99"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            placeholder="e.g., Next-gen gaming with 4K visuals"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Image URL</label>
          <input
            type="text"
            placeholder="e.g., /products/ps5.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddItemForm;