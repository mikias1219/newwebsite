import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const navbarVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  }
};

const itemVariants = {
  hover: { scale: 1.05, originX: 0 }
};

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-800/95 backdrop-blur-sm p-4 sticky top-0 z-50 shadow-xl"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: -15 }}>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
          </motion.div>
          <span className="text-white text-2xl font-bold tracking-tighter">Selik Labs</span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <motion.div whileHover="hover" variants={itemVariants}>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
            </motion.div>

            <motion.div whileHover="hover" className="relative group" variants={itemVariants}>
              <button className="text-gray-300 hover:text-white flex items-center gap-1">
                Maintenance
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute hidden group-hover:block bg-gray-700/95 backdrop-blur-sm rounded-lg p-2 mt-2 shadow-xl"
              >
                <li className="px-4 py-2 hover:bg-gray-600/50 rounded-md">
                  <Link to="/maintenance/cleaning" className="text-gray-300 hover:text-white">
                    Cleaning
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600/50 rounded-md">
                  <Link to="/maintenance/repair" className="text-gray-300 hover:text-white">
                    Repair
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600/50 rounded-md">
                  <Link to="/maintenance/upgrades" className="text-gray-300 hover:text-white">
                    Upgrades
                  </Link>
                </li>
              </motion.ul>
            </motion.div>

            <motion.div whileHover="hover" variants={itemVariants}>
              <Link to="/tutorials" className="text-gray-300 hover:text-white">
                Tutorials
              </Link>
            </motion.div>

            <motion.div whileHover="hover" className="relative group" variants={itemVariants}>
              <button className="text-gray-300 hover:text-white flex items-center gap-1">
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute hidden group-hover:block bg-gray-700/95 backdrop-blur-sm rounded-lg p-2 mt-2 shadow-xl"
              >
                <li className="px-4 py-2 hover:bg-gray-600/50 rounded-md">
                  <Link to="/services/kits" className="text-gray-300 hover:text-white">
                    Kits
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600/50 rounded-md">
                  <Link to="/services/professional" className="text-gray-300 hover:text-white">
                    Professional
                  </Link>
                </li>
              </motion.ul>
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} className="relative">
              <Link to="/cart" className="text-gray-300 hover:text-white p-2 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {user ? (
              <motion.div className="flex items-center gap-4" variants={itemVariants}>
                <Link
                  to={user.is_admin ? "/admin" : "/dashboard"}
                  className="text-gray-300 hover:text-white"
                >
                  {user.is_admin ? (
                    <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full">
                      <span>👑 Admin</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 px-3 py-1 rounded-full">Dashboard</span>
                    </div>
                  )}
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 px-3 py-1 rounded-full border border-red-500/20 hover:border-red-500/40"
                >
                  Logout
                </motion.button>
              </motion.div>
            ) : (
              <motion.div className="flex gap-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-1 rounded-full border border-gray-600 hover:border-gray-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-1 rounded-full"
                >
                  Register
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;