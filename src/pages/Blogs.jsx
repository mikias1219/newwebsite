import BlogCard from '../components/BlogCard';
import React from 'react';  

function Blogs() {
  const posts = [
    { id: 1, title: 'Inventory Tips', excerpt: 'Learn how to optimize stock.' },
    { id: 2, title: 'Why Track Inventory?', excerpt: 'Benefits of real-time tracking.' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Blogs;