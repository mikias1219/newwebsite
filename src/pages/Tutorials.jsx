import React, { useState, useEffect, useContext } from 'react';
import { fetchTutorials } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { addItemToCart } = useContext(CartContext);
  const [filterType, setFilterType] = useState('All');

  const loadTutorials = async () => {
    try {
      const data = await fetchTutorials();
      setTutorials(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTutorials();
  }, []);

  // Convert YouTube URL to embed URL (same as ProductModal.jsx)
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId =
      url.split('v=')[1]?.split('&')[0] ||
      url.split('youtu.be/')[1]?.split('?')[0] ||
      url.split('youtube.com/shorts/')[1]?.split('?')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const filteredTutorials = filterType === 'All'
    ? tutorials
    : tutorials.filter(tutorial => tutorial.tutorial_type === filterType);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Video Tutorials</h1>
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-300 mr-2">Filter by Type:</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="All">All</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Software">Software</option>
          <option value="Gaming">Gaming</option>
          <option value="DIY">DIY</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {loading ? (
        <p className="text-gray-300">Loading tutorials...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.length === 0 ? (
            <p className="text-gray-300">No tutorials available for this type.</p>
          ) : (
            filteredTutorials.map((tutorial) => (
              <div key={tutorial.id} className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-2">{tutorial.title}</h2>
                <p className="text-gray-400 text-sm mb-2">Type: {tutorial.tutorial_type}</p>
                <p className="text-gray-300 whitespace-pre-line mb-4">{tutorial.content}</p>
                {tutorial.video_url && (
                  <iframe
                    width="100%"
                    height="200"
                    src={getYouTubeEmbedUrl(tutorial.video_url)}  // Use embed URL
                    title={tutorial.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="mb-4 rounded-md"
                  ></iframe>
                )}
                {tutorial.video_file && (
                  <video
                    width="100%"
                    height="200"
                    controls
                    className="mb-4 rounded-md"
                  >
                    <source
                      src={`http://localhost:8000/media/${tutorial.video_file.split('/').pop()}`}  // Use media URL
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
                <p className="text-sm text-gray-500 mb-2">
                  Posted: {new Date(tutorial.posted_date).toLocaleDateString()}
                </p>
                <p className="text-lg font-bold text-white mb-4">
                  Price: ${tutorial.price.toFixed(2)}
                </p>
                {user && !user.is_admin && (
                  <button
                    onClick={() => addItemToCart('tutorial', tutorial.id, {
                      title: tutorial.title,
                      price: tutorial.price,
                    })}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Add to Cart
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

export default Tutorials;