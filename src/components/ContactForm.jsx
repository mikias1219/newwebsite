
import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
        rows="4"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
        Send Message
      </button>
    </form>
  );
}

export default ContactForm;
