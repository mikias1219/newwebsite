
import React from 'react';
import ContactForm from '../components/ContactForm';

function Contact() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
      <p className="text-lg mb-6 text-center">Get in touch with us for any inquiries or service requests. Our team is ready to assist you with expert advice and support.</p>
      <ContactForm />
    </div>
  );
}

export default Contact;
