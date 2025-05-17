import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

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

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return {
    toast: (message, options) => context.addToast({ message, ...options }),
    success: (message, description) => context.addToast({ message, description, type: 'success' }),
    error: (message, description) => context.addToast({ message, description, type: 'error' }),
  };
};