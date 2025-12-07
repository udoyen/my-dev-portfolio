"use client"; // <--- This is CRITICAL. Without it, the code crashes.

import { useState } from 'react';

export default function ContactForm() {
  // State to store the input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Function to handle typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle the submit button
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page from reloading
    console.log("Form Submitted:", formData); // Logs to browser console
    alert("Message sent! (Check console for data)");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-4 border rounded-lg">

      <label className="flex flex-col">
        <span className="font-bold mb-1">Name</span>
        <input 
          type="text" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded text-black" 
          required 
        />
      </label>

      <label className="flex flex-col">
        <span className="font-bold mb-1">Email</span>
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded text-black" 
          required 
        />
      </label>

      <label className="flex flex-col">
        <span className="font-bold mb-1">Message</span>
        <textarea 
          name="message" 
          value={formData.message}
          onChange={handleChange}
          className="border p-2 rounded text-black h-32" 
          required 
        />
      </label>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
        Send Message
      </button>
    </form>
  );
}