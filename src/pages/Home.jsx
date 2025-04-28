import React from 'react';
import ProductCard from '../components/ProductCard';

function Home({ products }) {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
          Welcome to Selik
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
          Empowering businesses and gamers with cutting-edge services and innovative solutions. 
          Discover a world of possibilities with us.
        </p>
        <a
          href="#products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium 
          hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          Discover More
        </a>
      </section>

      {/* Products Section */}
      <section id="products" className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="transform transition duration-300 hover:scale-105"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;