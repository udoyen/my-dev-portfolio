"use client";
import { useState } from 'react';
import toast from 'react-hot-toast'; // <--- THIS IS THE KEY IMPORT

// 1. Define the shape of the form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  // 2. State with strict typing
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  // 3. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Handle Submit with Toast Notifications
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // A. Start the "Loading" Toast
    // This creates a loading spinner on the screen
    const toastId = toast.loading("Sending your message...");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // B. Success: Update the spinner to a Green Checkmark
        toast.success("Message sent successfully!", { id: toastId });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        // C. Error: Update the spinner to a Red X
        toast.error("Failed to send message.", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      
      <label className="flex flex-col">
        <span className="font-bold mb-1 text-gray-300">Name</span>
        <input 
          type="text" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 outline-none transition" 
          required 
        />
      </label>

      <label className="flex flex-col">
        <span className="font-bold mb-1 text-gray-300">Email</span>
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 outline-none transition" 
          required 
        />
      </label>

      <label className="flex flex-col">
        <span className="font-bold mb-1 text-gray-300">Message</span>
        <textarea 
          name="message" 
          value={formData.message}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600 text-white h-32 focus:border-blue-500 outline-none transition" 
          required 
        />
      </label>

      <button 
        type="submit" 
        className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </form>
  );
}