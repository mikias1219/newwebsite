
import React from 'react';
import ProductCard from '../components/ItemCard';

function Home({ products }) {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Selik</h1>
      <p className="text-lg mb-6">Empowering businesses and gamers alike with exceptional services and innovative solutions. Explore a world of possibilities with us.</p>
      <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition mb-8">
        Discover More
      </button>
      <h2 className="text-2xl font-semibold mb-4">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
