
import React, { useState } from 'react';

function ProductForm({ products, setProducts, setBlogs }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const postedDate = new Date().toISOString().split('T')[0];
    const product = {
      id: editId || Date.now(),
      name,
      type,
      price: parseFloat(price),
      description,
      image: image || '/products/placeholder.jpg',
      postedDate,
    };

    setProducts((prev) =>
      editId
        ? prev.map((p) => (p.id === editId ? product : p))
        : [...prev, product]
    );

    // Auto-generate blog post for new product
    if (!editId) {
      setBlogs((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: `Introducing ${name}`,
          excerpt: `Discover the new ${name}, a ${type} PlayStation with ${description.slice(0, 50)}...`,
          postedDate,
        },
      ]);
    }

    // Set success message
    setMessage(editId ? 'Product updated successfully!' : 'Product added successfully!');

    // Reset form
    setName('');
    setType('');
    setPrice('');
    setDescription('');
    setImage('');
    setEditId(null);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (product) => {
    setName(product.name);
    setType(product.type);
    setPrice(product.price.toString());
    setDescription(product.description);
    setImage(product.image);
    setEditId(product.id);
    setMessage('');
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setMessage('Product deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        {editId ? 'Edit Product' : 'Add New Product'}
      </h3>
      {message && <p className="text-green-500 mb-4">{message}</p>}
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
              <p className="text-sm text-gray-500">Posted: {product.postedDate}</p>
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
