import React, { useState } from 'react';
import { createTutorial, updateTutorial, deleteTutorial } from '../services/api';

function TutorialForm({ tutorials, setTutorials }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const posted_date = new Date().toISOString().split('T')[0];
    const tutorial = {
      title,
      content,
      posted_date,
    };

    try {
      const token = localStorage.getItem('authToken');
      let newTutorial;
      if (editId) {
        newTutorial = await updateTutorial(editId, tutorial, token);
        setTutorials((prev) => prev.map((t) => (t.id === editId ? newTutorial : t)));
        setMessage('Tutorial updated successfully!');
      } else {
        newTutorial = await createTutorial(tutorial, token);
        setTutorials((prev) => [...prev, newTutorial]);
        setMessage('Tutorial added successfully!');
      }

      // Reset form
      setTitle('');
      setContent('');
      setEditId(null);
      setError('');
    } catch (err) {
      setError('Failed to save tutorial');
    }

    setTimeout(() => {
      setMessage('');
      setError('');
    }, 3000);
  };

  const handleEdit = (tutorial) => {
    setTitle(tutorial.title);
    setContent(tutorial.content);
    setEditId(tutorial.id);
    setMessage('');
    setError('');
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteTutorial(id, token);
      setTutorials((prev) => prev.filter((t) => t.id !== id));
      setMessage('Tutorial deleted successfully!');
      setError('');
    } catch (err) {
      setError('Failed to delete tutorial');
    }
    setTimeout(() => {
      setMessage('');
      setError('');
    }, 3000);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        {editId ? 'Edit Tutorial' : 'Add New Tutorial'}
      </h3>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-gray-700 p-6 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-300">Tutorial Title</label>
          <input
            type="text"
            placeholder="e.g., How to Maintain Your PlayStation 5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Content</label>
          <textarea
            placeholder="e.g., Steps to clean and maintain your console..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
            rows="8"
            required
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          {editId ? 'Update Tutorial' : 'Add Tutorial'}
        </button>
      </form>
      <h3 className="text-xl font-semibold mb-4 text-white">Current Tutorials</h3>
      <div className="space-y-4">
        {tutorials.length === 0 ? (
          <p className="text-gray-300">No tutorials available.</p>
        ) : (
          tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-gray-700 p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-white">{tutorial.title}</h4>
              <p className="text-gray-300">{tutorial.content.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500">Posted: {tutorial.posted_date}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(tutorial)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tutorial.id)}
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

export default TutorialForm;