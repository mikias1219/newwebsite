import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Selik Labs</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-blue-400">Home</Link>
          </li>
          <li className="relative group">
            <button className="text-white hover:text-blue-400 flex items-center">
              Maintenance
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul className="absolute hidden group-hover:block bg-gray-700 text-white rounded shadow-lg mt-2">
              <li>
                <Link to="/maintenance/cleaning" className="block px-4 py-2 hover:bg-gray-600">Cleaning</Link>
              </li>
              <li>
                <Link to="/maintenance/repair" className="block px-4 py-2 hover:bg-gray-600">Repair</Link>
              </li>
              <li>
                <Link to="/maintenance/upgrades" className="block px-4 py-2 hover:bg-gray-600">Upgrades</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/tutorials" className="text-white hover:text-blue-400">Tutorials</Link>
          </li>
          <li className="relative group">
            <button className="text-white hover:text-blue-400 flex items-center">
              Services
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul className="absolute hidden group-hover:block bg-gray-700 text-white rounded shadow-lg mt-2">
              <li>
                <Link to="/services/kits" className="block px-4 py-2 hover:bg-gray-600">Kits</Link>
              </li>
              <li>
                <Link to="/services/professional" className="block px-4 py-2 hover:bg-gray-600">Professional Services</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/cart" className="text-white hover:text-blue-400">Cart</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to={user.is_admin ? "/admin" : "/dashboard"} className="text-white hover:text-blue-400">
                  {user.is_admin ? "Admin" : "Dashboard"}
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white hover:text-blue-400">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-blue-400">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-blue-400">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;