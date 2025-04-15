import ItemCard from '../components/ItemCard';
import { useState, useEffect } from 'react';
import { fetchInventory } from '../services/api';
import React from 'react';

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchInventory();
        setItems(data.slice(0, 3)); // Show 3 featured items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to InventoryApp</h1>
      <p className="mb-4">Manage your inventory with ease.</p>
      <h2 className="text-xl font-semibold mb-2">Featured Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;