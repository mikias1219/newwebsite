import React, { useState, useEffect } from 'react';

function TutorialForm({ onSubmit, initialData, clearEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Cleaning',
    price: 9.99,
    posted_date: new Date().toISOString().split('T')[0],
    video_url: '',
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
        title: '',
        content: '',
        category: 'Cleaning',
        price: 9.99,
        posted_date: new Date().toISOString().split('T')[0],
        video_url: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
          rows="4"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
        >
          <option value="Cleaning">Cleaning</option>
          <option value="Repair">Repair</option>
          <option value="Upgrades">Upgrades</option>
        </select>
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
        <label className="block text-sm font-medium text-gray-300">YouTube Video URL</label>
        <input
          type="text"
          value={formData.video_url}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {initialData ? 'Update' : 'Create'} Tutorial
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

export default TutorialForm;