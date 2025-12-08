"use client"; // <--- This is CRITICAL. Without it, the code crashes.

import { useState } from 'react';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  // State to store the input values
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  // Function to handle typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle the submit button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Send data to our new API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // 2. Wait for the server's answer
    const result = await response.json();

    // 3. React to the answer
    if (result.success) {
      toast.success("Message sent successfully! " + result.message);
      // alert("Success! " + result.message);
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } else {
      toast.error("Something went wrong. Please try again.");
    }
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