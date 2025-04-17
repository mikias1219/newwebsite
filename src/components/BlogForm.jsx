
import React, { useState } from 'react';

function BlogForm({ blogs, setBlogs }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const postedDate = new Date().toISOString().split('T')[0];
    const blog = {
      id: editId || Date.now(),
      title,
      excerpt,
      postedDate,
    };

    setBlogs((prev) =>
      editId
        ? prev.map((b) => (b.id === editId ? blog : b))
        : [...prev, blog]
    );

    // Set success message
    setMessage(editId ? 'Blog post updated successfully!' : 'Blog post added successfully!');

    // Reset form
    setTitle('');
    setExcerpt('');
    setEditId(null);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setEditId(blog.id);
    setMessage('');
  };

  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    setMessage('Blog post deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        {editId ? 'Edit Blog Post' : 'Add New Blog Post'}
      </h3>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-gray-700 p-6 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-300">Blog Title</label>
          <input
            type="text"
            placeholder="e.g., New PlayStation Release"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Excerpt</label>
          <textarea
            placeholder="e.g., Discover the latest PlayStation features..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          {editId ? 'Update Blog Post' : 'Add Blog Post'}
        </button>
      </form>
      <h3 className="text-xl font-semibold mb-4 text-white">Current Blog Posts</h3>
      <div className="space-y-4">
        {blogs.length === 0 ? (
          <p className="text-gray-300">No blog posts available.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="bg-gray-700 p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-white">{blog.title}</h4>
              <p className="text-gray-300">{blog.excerpt}</p>
              <p className="text-sm text-gray-500">Posted: {blog.postedDate}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
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

export default BlogForm;
