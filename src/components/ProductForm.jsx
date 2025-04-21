import React, { useState } from 'react';
import { createProduct, updateProduct, deleteProduct, createTutorial } from '../services/api';

function ProductForm({ products, setProducts, setTutorials }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const posted_date = new Date().toISOString().split('T')[0];
    const product = {
      name,
      type,
      price: parseFloat(price),
      description,
      image: image || '/products/placeholder.jpg',
      posted_date,
    };

    try {
      const token = localStorage.getItem('authToken');
      let newProduct;
      if (editId) {
        newProduct = await updateProduct(editId, product, token);
        setProducts((prev) => prev.map((p) => (p.id === editId ? newProduct : p)));
        setMessage('Product updated successfully!');
      } else {
        newProduct = await createProduct(product, token);
        setProducts((prev) => [...prev, newProduct]);
        setMessage('Product added successfully!');

        // Auto-generate tutorial
        const tutorial = {
          title: `How to Maintain Your ${name}`,
          content: `Learn how to keep your ${name} (${type}) in top condition:\n\n1. **Cleaning**: Use a soft, dry cloth to wipe the console weekly. Avoid water or harsh chemicals.\n2. **Ventilation**: Ensure the console is in a well-ventilated area to prevent overheating.\n3. **Disc Care**: Store discs in their cases to avoid scratches.\n4. **Software Updates**: Regularly check for system updates via Settings > System > System Software.\n5. **Controller Maintenance**: Clean controllers with a damp cloth and check battery levels.\n\nFor detailed support, contact our team at support@seliklabs.com.`,
          posted_date,
        };
        const newTutorial = await createTutorial(tutorial, token);
        setTutorials((prev) => [...prev, newTutorial]);
      }

      // Reset form
      setName('');
      setType('');
      setPrice('');
      setDescription('');
      setImage('');
      setEditId(null);
      setError('');
    } catch (err) {
      setError('Failed to save product');
    }

    setTimeout(() => {
      setMessage('');
      setError('');
    }, 3000);
  };

  const handleEdit = (product) => {
    setName(product.name);
    setType(product.type);
    setPrice(product.price.toString());
    setDescription(product.description);
    setImage(product.image);
    setEditId(product.id);
    setMessage('');
    setError('');
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage('Product deleted successfully!');
      setError('');
    } catch (err) {
      setError('Failed to delete product');
    }
    setTimeout(() => {
      setMessage('');
      setError('');
    }, 3000);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        {editId ? 'Edit Product' : 'Add New Product'}
      </h3>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-gray-700 p-6 rounded-lg">
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
          {editId ? 'Update Product' : 'Add Product'}
        </button>
      </form>
      <h3 className="text-xl font-semibold mb-4 text-white">Current Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p className="text-gray-300">No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-gray-700 p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-white">{product.name} ({product.type})</h4>
              <p className="text-gray-300">Price: ${product.price.toFixed(2)}</p>
              <p className="text-gray-300">{product.description}</p>
              <p className="text-sm text-gray-500">Posted: {product.posted_date}</p>
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mt-2" />
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductForm;