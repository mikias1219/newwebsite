
import React from 'react';

function About() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Who We Are</h2>
      <p className="text-lg mb-6 text-center">Selik Labs is a community of gaming enthusiasts, tech experts, and creative thinkers. Our team is driven by a shared vision of enhancing gaming through innovative solutions.</p>
      <p className="text-lg mb-6 text-center">We specialize in creating custom-built gaming setups and providing advanced maintenance solutions.</p>
      <h3 className="text-2xl font-semibold mb-4 text-center">Our Core Values</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Innovation', desc: 'We push the boundaries of what is possible to deliver cutting-edge solutions in gaming and design.' },
          { title: 'Customer-Centric', desc: 'Our customers are at the heart of everything we do. We listen, adapt, and exceed expectations.' },
          { title: 'Quality', desc: 'Every product and service is meticulously tested to ensure the highest standards of performance and reliability.' },
          { title: 'Passion', desc: 'Our love for gaming fuels our work. Passion drives us to deliver exceptional experiences every day.' },
          { title: 'Teamwork', desc: 'Collaboration and mutual respect are at the core of our operations. Together, we create innovative solutions.' },
          { title: 'Dedication', desc: 'We are dedicated to excellence and committed to providing the best solutions for our community.' },
        ].map((value) => (
          <div key={value.title} className="bg-gray-700 p-4 rounded-lg shadow">
            <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
            <p>{value.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
