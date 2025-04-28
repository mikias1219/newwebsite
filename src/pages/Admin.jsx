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
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const loadData = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProduct = async (product) => {
    try {
      const token = localStorage.getItem('authToken');
      const newProduct = await createProduct(product, token);
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdateProduct = async (product) => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedProduct = await updateProduct(product.id, product, token);
      setProducts(products.map((p) => (p.id === product.id ? updatedProduct : p)));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteProduct(id, token);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCreateTutorial = async (tutorial) => {
    try {
      const token = localStorage.getItem('authToken');
      const newTutorial = await createTutorial(tutorial, token);
      setTutorials([...tutorials, newTutorial]);
    } catch (error) {
      console.error('Error creating tutorial:', error);
    }
  };

  const handleUpdateTutorial = async (tutorial) => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedTutorial = await updateTutorial(tutorial.id, tutorial, token);
      setTutorials(tutorials.map((t) => (t.id === tutorial.id ? updatedTutorial : t)));
      setEditingTutorial(null);
    } catch (error) {
      console.error('Error updating tutorial:', error);
    }
  };

  const handleDeleteTutorial = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteTutorial(id, token);
      setTutorials(tutorials.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting tutorial:', error);
    }
  };

  const handleCreateService = async (service) => {
    try {
      const token = localStorage.getItem('authToken');
      const newService = await createService(service, token);
      setServices([...services, newService]);
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleUpdateService = async (service) => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedService = await updateService(service.id, service, token);
      setServices(services.map((s) => (s.id === service.id ? updatedService : s)));
      setEditingService(null);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteService(id, token);
      setServices(services.filter((s) => s.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleUpdateRequest = async (requestId, status) => {
    try {
      const token = localStorage.getItem('authToken');
      const updatedRequest = await updateRequest(requestId, { status }, token);
      setRequests(requests.map((r) => (r.id === requestId ? updatedRequest : r)));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Admin Dashboard</h1>
      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 mr-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('tutorials')}
              className={`px-4 py-2 mr-2 rounded ${activeTab === 'tutorials' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Tutorials
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 mr-2 rounded ${activeTab === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 rounded ${activeTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Requests
            </button>
          </div>

          {activeTab === 'products' && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Manage Products</h2>
              <ProductForm
                onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                initialData={editingProduct}
                clearEdit={() => setEditingProduct(null)}
              />
              <div className="space-y-4 mt-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-gray-700 p-4 rounded-lg flex justify-between">
                    <div>
                      <p className="text-white">{product.name} ({product.type})</p>
                      <p className="text-gray-300">${product.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tutorials' && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Manage Tutorials</h2>
              <TutorialForm
                onSubmit={editingTutorial ? handleUpdateTutorial : handleCreateTutorial}
                initialData={editingTutorial}
                clearEdit={() => setEditingTutorial(null)}
              />
              <div className="space-y-4 mt-4">
                {tutorials.map((tutorial) => (
                  <div key={tutorial.id} className="bg-gray-700 p-4 rounded-lg flex justify-between">
                    <div>
                      <p className="text-white">{tutorial.title} ({tutorial.category})</p>
                      <p className="text-gray-300">${tutorial.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => setEditingTutorial(tutorial)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTutorial(tutorial.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Manage Services</h2>
              <ServiceForm
                onSubmit={editingService ? handleUpdateService : handleCreateService}
                initialData={editingService}
                clearEdit={() => setEditingService(null)}
              />
              <div className="space-y-4 mt-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-gray-700 p-4 rounded-lg flex justify-between">
                    <div>
                      <p className="text-white">{service.name} ({service.category})</p>
                      <p className="text-gray-300">${service.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => setEditingService(service)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Manage Requests</h2>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-white">{request.title}</p>
                    <p className="text-gray-300">{request.description}</p>
                    <p className="text-gray-300">Status: {request.status}</p>
                    <p className="text-gray-500 text-sm">Posted: {request.posted_date}</p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleUpdateRequest(request.id, 'approved')}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        disabled={request.status !== 'pending'}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateRequest(request.id, 'rejected')}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        disabled={request.status !== 'pending'}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Admin;