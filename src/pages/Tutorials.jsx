import React from 'react';

function Tutorials({ tutorials }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Tutorials</h2>
      <div className="space-y-6">
        {tutorials.length === 0 ? (
          <p className="text-gray-300 text-center">No tutorials available.</p>
        ) : (
          tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-2">{tutorial.title}</h3>
              <p className="text-gray-300 whitespace-pre-line">{tutorial.content}</p>
              <p className="text-sm text-gray-500 mt-2">Posted: {tutorial.posted_date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tutorials;