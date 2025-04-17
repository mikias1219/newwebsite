
import React from 'react';

function Navbar({ scrollToSection, refs }) {
  return (
    <nav className="bg-gray-900 p-4 sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/logo.png" alt="Selik Labs Logo" className="h-10" />
        <div className="space-x-6">
          <button onClick={() => scrollToSection(refs.homeRef)} className="hover:text-blue-400 transition">
            Home
          </button>
          <button onClick={() => scrollToSection(refs.aboutRef)} className="hover:text-blue-400 transition">
            About
          </button>
          <button onClick={() => scrollToSection(refs.servicesRef)} className="hover:text-blue-400 transition">
            Services
          </button>
          <button onClick={() => scrollToSection(refs.contactRef)} className="hover:text-blue-400 transition">
            Contact
          </button>
          <button onClick={() => scrollToSection(refs.blogsRef)} className="hover:text-blue-400 transition">
            Blogs
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;