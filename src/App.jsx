import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

// Move Toast context to a separate file (recommended) or keep here with proper exports
const ToastContext = React.createContext();

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts([...toasts, { id, ...toast }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[300px]"
            >
              <div className="flex items-center gap-3">
                <div className={`w-1 h-8 rounded-full ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />
                <div>
                  <p className="font-medium text-gray-900">{toast.message}</p>
                  {toast.description && (
                    <p className="text-sm text-gray-600 mt-1">{toast.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

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
      {/* Wrap everything with ToastProvider first */}
      <ToastProvider>
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
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;