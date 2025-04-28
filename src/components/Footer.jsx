import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-auto">
      <div className="container mx-auto text-center text-gray-300">
        <p>&copy; 2025 Selik Labs. All rights reserved.</p>
        <p>
          <a href="/about" className="hover:text-blue-400">About</a> | 
          <a href="/contact" className="hover:text-blue-400 ml-2">Contact</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;