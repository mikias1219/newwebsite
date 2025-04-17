
import React from 'react';

function ServiceCard({ service }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition">
      <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded mb-4" />
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-gray-300">{service.description}</p>
    </div>
  );
}

export default ServiceCard;
