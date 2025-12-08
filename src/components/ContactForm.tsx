"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper function to check email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- LOGIC VALIDATION (Layer 2) ---
    // Even though HTML checks this, we double-check here for security
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return; 
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    // --- SENDING ---
    const toastId = toast.loading("Sending your message...");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!", { id: toastId });
        setFormData({ name: '', email: '', message: '' });
      } else {
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
        <span className="font-bold mb-1 text-gray-300">
          Name <span className="text-red-500">*</span>
        </span>
        <input 
          type="text" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 outline-none transition"
          placeholder="Your Name" 
          required // <--- Layer 1 Security
        />
      </label>

      <label className="flex flex-col">
        <span className="font-bold mb-1 text-gray-300">
          Email <span className="text-red-500">*</span>
        </span>
        <input 
          type="text" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 outline-none transition"
          placeholder="you@example.com"
          required // <--- Layer 1 Security
        />
      </label>

      <label className="flex flex-col">
        <span className="font-bold mb-1 text-gray-300">
          Message <span className="text-red-500">*</span>
        </span>
        <textarea 
          name="message" 
          value={formData.message}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600 text-white h-32 focus:border-blue-500 outline-none transition"
          placeholder="How can I help you?" 
          required // <--- Layer 1 Security
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