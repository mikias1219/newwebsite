import { NavLink } from 'react-router-dom';
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <span className="text-xl font-bold">InventoryApp</span>
        <div className="space-x-4">
          <NavLink to="/" className="hover:underline">Home</NavLink>
          <NavLink to="/about" className="hover:underline">About</NavLink>
          <NavLink to="/services" className="hover:underline">Services</NavLink>
          <NavLink to="/contact" className="hover:underline">Contact</NavLink>
          <NavLink to="/blogs" className="hover:underline">Blogs</NavLink>
          <NavLink to="/inventory" className="hover:underline">Inventory</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;