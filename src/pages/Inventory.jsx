import { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import AddItemForm from '../components/AddItemForm';
import { fetchInventory, addItem } from '../services/api';
import React from 'react';

function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      const data = await fetchInventory();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    const interval = setInterval(loadItems, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const addedItem = await addItem(newItem);
      setItems([...items, addedItem]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <AddItemForm onAddItem={handleAddItem} />
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

export default Inventory;