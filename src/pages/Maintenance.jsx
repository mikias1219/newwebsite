import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTutorials } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function Maintenance() {
  const { category } = useParams();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { addItemToCart } = useContext(CartContext);

  const loadTutorials = async () => {
    try {
      const data = await fetchTutorials();
      const filtered = category
        ? data.filter((t) => t.category.toLowerCase() === category.toLowerCase())
        : data;
      setTutorials(filtered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTutorials();
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">
        PlayStation Maintenance {category ? ` - ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''}
      </h1>
      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <div className="space-y-4">
          {tutorials.length === 0 ? (
            <p className="text-gray-300">No tutorials available.</p>
          ) : (
            tutorials.map((tutorial) => (
              <div key={tutorial.id} className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-white">{tutorial.title}</h2>
                <p className="text-gray-300 whitespace-pre-line mb-4">{tutorial.content}</p>
                {tutorial.video_url && (
                  <iframe
                    width="100%"
                    height="315"
                    src={tutorial.video_url}
                    title={tutorial.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="mb-4"
                  ></iframe>
                )}
                <p className="text-sm text-gray-500 mb-2">Posted: {tutorial.posted_date}</p>
                {user && !user.is_admin && (
                  <button
                    onClick={() => addItemToCart('tutorial', tutorial.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Add to Cart (${tutorial.price.toFixed(2)})
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Maintenance;