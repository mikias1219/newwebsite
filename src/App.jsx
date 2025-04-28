import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inventory from './pages/Inventory';
import Maintenance from './pages/Maintenance';
import Tutorials from './pages/Tutorials';
import Services from './pages/Services';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="container mx-auto p-4 text-white">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Inventory />} />
              <Route path="/maintenance/:category?" element={<Maintenance />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/services/:category?" element={<Services />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<ErrorBoundary><Admin /></ErrorBoundary>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;