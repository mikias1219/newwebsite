import React from 'react';

function BlogCard({ post }) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="text-gray-600">{post.excerpt}</p>
      </div>
    );
  }
  
  export default BlogCard;