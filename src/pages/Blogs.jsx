
import React from 'react';

function Blogs({ blogs }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Blogs</h2>
      <div className="space-y-4">
        {blogs.map((post) => (
          <div key={post.id} className="bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-300 mb-2">{post.excerpt}</p>
            <p className="text-sm text-gray-500">Posted: {post.postedDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
