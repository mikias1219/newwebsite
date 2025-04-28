import React, { useState, useEffect, useContext } from 'react';
import { fetchPurchases, fetchRequests, createRequest } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function Dashboard() {
  const [purchases, setPurchases] = useState([]);
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const { tutorials, services } = useContext(CartContext);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const [purchasesData, requestsData] = await Promise.all([
        fetchPurchases(token),
        fetchRequests(token),
      ]);
      setPurchases(purchasesData);
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

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const requestData = {
        ...newRequest,
        posted_date: new Date().toISOString().split('T')[0],
      };
      await createRequest(requestData, token);
      setNewRequest({ title: '', description: '' });
      loadData();
    } catch (error) {
      setError('Failed to submit request');
    }
  };

  const getItemDetails = (itemType, itemId) => {
    if (itemType === 'tutorial') {
      return tutorials.find((t) => t.id === itemId);
    } else if (itemType === 'service') {
      return services.find((s) => t.id === itemId);
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">User Dashboard</h1>
      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2 text-white">Purchase History</h2>
          <div className="space-y-4 mb-8">
            {purchases.length === 0 ? (
              <p className="text-gray-300">No purchases yet.</p>
            ) : (
              purchases.map((purchase) => {
                const details = getItemDetails(purchase.item_type, purchase.item_id);
                return details ? (
                  <div key={purchase.id} className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-white">{details.name || details.title} ({purchase.item_type})</p>
                    <p className="text-gray-300">Quantity: {purchase.quantity}</p>
                    <p className="text-gray-300">Total: ${purchase.total_price.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">Purchased: {purchase.purchase_date}</p>
                  </div>
                ) : null;
              })
            )}
          </div>

          <h2 className="text-xl font-semibold mb-2 text-white">Your Requests</h2>
          <div className="space-y-4 mb-8">
            {requests.length === 0 ? (
              <p className="text-gray-300">No requests submitted.</p>
            ) : (
              requests.map((request) => (
                <div key={request.id} className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-white">{request.title}</p>
                  <p className="text-gray-300">{request.description}</p>
                  <p className="text-gray-300">Status: {request.status}</p>
                  <p className="text-gray-500 text-sm">Posted: {request.posted_date}</p>
                </div>
              ))
            )}
          </div>

          <h2 className="text-xl font-semibold mb-2 text-white">Submit a Request</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Request Title</label>
              <input
                type="text"
                value={newRequest.title}
                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Description</label>
              <textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                className="w-full p-2 mt-1 rounded bg-gray-600 text-white border border-gray-500"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Submit Request
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Dashboard;