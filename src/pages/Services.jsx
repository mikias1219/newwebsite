
import React from 'react';
import ServiceCard from '../components/ServiceCard';

function Services() {
  const services = [
    {
      title: 'Selik Store',
      description: 'Dive into our vast collection of PlayStation games tailored for every gamer. Discover the latest releases and exclusive titles.',
      image: '/products/ps5.jpg',
    },
    {
      title: 'Selik Digital',
      description: 'Empower your business with custom software solutions from our expert development team, crafted to meet your needs.',
      image: '/products/ps5-slim.jpg',
    },
    {
      title: 'Selik Maintenance',
      description: 'Experience dependable support with our skilled maintenance team, ready to handle technical and physical challenges.',
      image: '/products/ps4.jpg',
    },
    {
      title: 'Selik Security',
      description: 'Stay secure with our advanced security camera systems, designed for homes and businesses to ensure your safety.',
      image: '/products/ps5.jpg',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
}

export default Services;
