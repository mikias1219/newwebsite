import React, { useState, useEffect } from 'react';
import { fetchPurchases, fetchRequests, createRequest } from '../services/api';

const Dashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please log in to view your dashboard.');
        return;
      }
      const [purchasesData, requestsData] = await Promise.all([
        fetchPurchases(token),
        fetchRequests(token),
      ]);
      setPurchases(purchasesData);
      setRequests(requestsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(
        error.response?.data?.detail || 'Failed to load dashboard data. Please check your connection or login again.'
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await createRequest(newRequest, token);
      setNewRequest({ title: '', description: '' });
      loadData();
    } catch (error) {
      console.error('Error creating request:', error);
      setError(
        error.response?.data?.detail || 'Failed to create request.'
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">Your Purchases</h2>
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id}>
            {purchase.item_type} ID {purchase.item_id} - Quantity: {purchase.quantity} - Total: ${purchase.total_price}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2 mt-4">Your Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            {request.title} - Status: {request.status}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2 mt-4">Create New Request</h2>
      <form onSubmit={handleRequestSubmit}>
        <input
          type="text"
          value={newRequest.title}
          onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
          placeholder="Request Title"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          value={newRequest.description}
          onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
          placeholder="Request Description"
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default Dashboard;