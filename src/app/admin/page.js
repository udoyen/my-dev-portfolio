"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // <--- 1. Import Router

export default function AdminPage() {
  const { user, isLoaded } = useUser(); // <--- 2. Get isLoaded to know when Clerk is ready
  const router = useRouter();
  
  // DATA STATE
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: "", role: "", description: "" });
  const [loading, setLoading] = useState(false);
  
  // UI STATE
  const [editingId, setEditingId] = useState(null);
  const [authorized, setAuthorized] = useState(false); // <--- 3. Security State

  // 4. SECURITY CHECK (THE BOUNCER)
  useEffect(() => {
    if (isLoaded) {
      // REPLACE THIS WITH YOUR ACTUAL EMAIL ADDRESS
      const MY_EMAIL = "datameshprojects@gmail.com"; 
      
      // Check if the current user is YOU
      if (user?.primaryEmailAddress?.emailAddress !== MY_EMAIL) {
        router.push("/"); // Kick them out to Home Page
      } else {
        setAuthorized(true); // Let them in
      }
    }
  }, [isLoaded, user, router]);

  // 5. FETCH PROJECTS (Only runs if authorized)
  useEffect(() => {
    if (authorized) {
      fetchProjects();
    }
  }, [authorized]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      role: project.role,
      description: project.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", role: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        alert("Project Updated!");
      } else {
        await fetch("/api/projects", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        alert("Project Added!");
      }
      
      handleCancel();
      fetchProjects();
    } catch (error) {
      alert("Error saving project");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  // 6. LOADING SCREEN (Blocks content until check finishes)
  if (!isLoaded || !authorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-bold animate-pulse">Checking security clearance...</p>
      </div>
    );
  }

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <p className="mb-8">Welcome, {user?.firstName} (Admin)</p>

      {/* FORM */}
      <div className={`p-8 rounded-lg mb-12 border ${editingId ? 'bg-blue-900 border-blue-500' : 'bg-gray-800 border-gray-700'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>
          {editingId && (
            <button onClick={handleCancel} className="text-sm text-gray-300 hover:text-white underline">
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" required />
          <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white h-24" required />
          
          <button type="submit" disabled={loading} className={`p-2 rounded text-white font-bold transition ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
            {loading ? "Saving..." : (editingId ? "Update Project" : "Add Project")}
          </button>
        </form>
      </div>

      {/* LIST */}
      <h2 className="text-2xl font-bold mb-6">Existing Projects</h2>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project._id} className="flex justify-between items-center bg-gray-900 p-4 rounded border border-gray-700">
            <div>
              <h3 className="font-bold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-400">{project.role}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleEditClick(project)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(project._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}