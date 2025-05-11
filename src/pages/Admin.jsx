import React, { useState, useEffect } from 'react';
import {
  fetchProducts, createProduct, updateProduct, deleteProduct,
  fetchTutorials, createTutorial, updateTutorial, deleteTutorial,
  fetchServices, createService, updateService, deleteService,
  fetchRequests, updateRequest
} from '../services/api';
import ProductForm from '../components/ProductForm';
import TutorialForm from '../components/TutorialForm';
import ServiceForm from '../components/ServiceForm';

function Admin() {
  const [products, setProducts] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [editingService, setEditingService] = useState(null);

  // Load all data on mount
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('authToken');
      const [productsData, tutorialsData, servicesData, requestsData] = await Promise.all([
        fetchProducts(),
        fetchTutorials(),
        fetchServices(),
        fetchRequests(token),
      ]);
      setProducts(productsData);
      setTutorials(tutorialsData);
      setServices(servicesData);
      setRequests(requestsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Show notification with timeout
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Product handlers
  const handleCreateProduct = async (product) => {
    try {
      const token = localStorage.getItem('authToken');
      const newProduct = await createProduct(product, token);
      setProducts([...products, newProduct]);
      showNotification('Product created successfully!');
    } catch (error) {
      showNotification('Error creating product.', 'error');
    }
  };

  const handleUpdateProduct = async (product) => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedProduct = await updateProduct(product.id, product, token);
      setProducts(products.map((p) => (p.id === product.id ? updatedProduct : p)));
      setEditingProduct(null);
      showNotification('Product updated successfully!');
    } catch (error) {
      showNotification('Error updating product.', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteProduct(id, token);
      setProducts(products.filter((p) => p.id !== id));
      showNotification('Product deleted successfully!');
    } catch (error) {
      showNotification('Error deleting product.', 'error');
    }
  };

  // Tutorial handlers
  const handleCreateTutorial = async (tutorial) => {
    try {
      const token = localStorage.getItem('authToken');
      const newTutorial = await createTutorial(tutorial, token);
      setTutorials([...tutorials, newTutorial]);
      showNotification('Tutorial created successfully!');
    } catch (error) {
      showNotification('Error creating tutorial.', 'error');
    }
  };

  const handleUpdateTutorial = async (tutorial) => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedTutorial = await updateTutorial(tutorial.id, tutorial, token);
      setTutorials(tutorials.map((t) => (t.id === tutorial.id ? updatedTutorial : t)));
      setEditingTutorial(null);
      showNotification('Tutorial updated successfully!');
    } catch (error) {
      showNotification('Error updating tutorial.', 'error');
    }
  };

  const handleDeleteTutorial = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteTutorial(id, token);
      setTutorials(tutorials.filter((t) => t.id !== id));
      showNotification('Tutorial deleted successfully!');
    } catch (error) {
      showNotification('Error deleting tutorial.', 'error');
    }
  };

  // Service handlers
  const handleCreateService = async (service) => {
    try {
      const token = localStorage.getItem('authToken');
      const newService = await createService(service, token);
      setServices([...services, newService]);
      showNotification('Service created successfully!');
    } catch (error) {
      showNotification('Error creating service.', 'error');
    }
  };

  const handleUpdateService = async (service) => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedService = await updateService(service.id, service, token);
      setServices(services.map((s) => (s.id === service.id ? updatedService : s)));
      setEditingService(null);
      showNotification('Service updated successfully!');
    } catch (error) {
      showNotification('Error updating service.', 'error');
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteService(id, token);
      setServices(services.filter((s) => s.id !== id));
      showNotification('Service deleted successfully!');
    } catch (error) {
      showNotification('Error deleting service.', 'error');
    }
  };

  // Request handlers
  const handleUpdateRequest = async (requestId, status) => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedRequest = await updateRequest(requestId, { status }, token);
      setRequests(requests.map((r) => (r.id === requestId ? updatedRequest : r)));
      showNotification(`Request ${status} successfully!`);
    } catch (error) {
      showNotification('Error updating request.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-700">
        {['products', 'tutorials', 'services', 'requests'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-600 text-white p-4 rounded-lg">
          {error}
          <button
            onClick={loadData}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
              <div className="mb-6">
                <ProductForm
                  onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                  initialData={editingProduct}
                  clearEdit={() => setEditingProduct(null)}
                />
              </div>
              <div className="grid gap-4">
                {products.length === 0 ? (
                  <p className="text-gray-400">No products available.</p>
                ) : (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition"
                    >
                      <div>
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <p className="text-gray-400">
                          {product.type} - ${product.price?.toFixed(2) || 'N/A'}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tutorials Tab */}
          {activeTab === 'tutorials' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Manage Tutorials</h2>
              <div className="mb-6">
                <TutorialForm
                  onSubmit={editingTutorial ? handleUpdateTutorial : handleCreateTutorial}
                  initialData={editingTutorial}
                  clearEdit={() => setEditingTutorial(null)}
                />
              </div>
              <div className="grid gap-4">
                {tutorials.length === 0 ? (
                  <p className="text-gray-400">No tutorials available.</p>
                ) : (
                  tutorials.map((tutorial) => (
                    <div
                      key={tutorial.id}
                      className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition"
                    >
                      <div>
                        <h3 className="text-lg font-medium">{tutorial.title}</h3>
                        <p className="text-gray-400">
                          {tutorial.category} - ${tutorial.price?.toFixed(2) || 'N/A'}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingTutorial(tutorial)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTutorial(tutorial.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Manage Services</h2>
              <div className="mb-6">
                <ServiceForm
                  onSubmit={editingService ? handleUpdateService : handleCreateService}
                  initialData={editingService}
                  clearEdit={() => setEditingService(null)}
                />
              </div>
              <div className="grid gap-4">
                {services.length === 0 ? (
                  <p className="text-gray-400">No services available.</p>
                ) : (
                  services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition"
                    >
                      <div>
                        <h3 className="text-lg font-medium">{service.name}</h3>
                        <p className="text-gray-400">
                          {service.category} - ${service.price?.toFixed(2) || 'N/A'}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingService(service)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Manage Requests</h2>
              <div className="grid gap-4">
                {requests.length === 0 ? (
                  <p className="text-gray-400">No requests available.</p>
                ) : (
                  requests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition"
                    >
                      <h3 className="text-lg font-medium">{request.title}</h3>
                      <p className="text-gray-400">{request.description}</p>
                      <p className="text-gray-400">
                        Status:{' '}
                        <span
                          className={`${
                            request.status === 'approved'
                              ? 'text-green-400'
                              : request.status === 'rejected'
                              ? 'text-red-400'
                              : 'text-yellow-400'
                          }`}
                        >
                          {request.status}
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        Posted: {new Date(request.posted_date).toLocaleDateString()}
                      </p>
                      <div className="mt-4 space-x-2">
                        <button
                          onClick={() => handleUpdateRequest(request.id, 'approved')}
                          className={`px-3 py-1 rounded text-white ${
                            request.status !== 'pending'
                              ? 'bg-gray-500 cursor-not-allowed'
                              : 'bg-green-500 hover:bg-green-600'
                          }`}
                          disabled={request.status !== 'pending'}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateRequest(request.id, 'rejected')}
                          className={`px-3 py-1 rounded text-white ${
                            request.status !== 'pending'
                              ? 'bg-gray-500 cursor-not-allowed'
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                          disabled={request.status !== 'pending'}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;