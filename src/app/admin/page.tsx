"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// --- TYPES DEFINITION ---
interface Project {
  _id: string;
  title: string;
  role: string;
  description: string;
}

interface FormData {
  title: string;
  role: string;
  description: string;
}

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  // --- STATE WITH TYPES ---
  // 1. Tell useState this is an array of 'Project' objects
  const [projects, setProjects] = useState<Project[]>([]);
  
  // 2. Tell useState this matches our FormData interface
  const [formData, setFormData] = useState<FormData>({ title: "", role: "", description: "" });
  
  const [loading, setLoading] = useState<boolean>(false);
  
  // 3. editingId can be a string OR null (if not editing)
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [authorized, setAuthorized] = useState<boolean>(false);

  // --- SECURITY CHECK ---
  useEffect(() => {
    if (isLoaded) {
      const MY_EMAIL = "datameshprojects@gmail.com"; // <--- CHECK THIS!
      
      // We use optional chaining (?) because user might be null
      if (user?.primaryEmailAddress?.emailAddress !== MY_EMAIL) {
        router.push("/"); 
      } else {
        setAuthorized(true);
      }
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (authorized) {
      fetchProjects();
    }
  }, [authorized]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data: Project[] = await res.json(); // Explicitly say "This JSON is a list of Projects"
    setProjects(data);
  };

  // --- EVENT HANDLERS ---
  
  // 'e' is a ChangeEvent on either an Input or Textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (project: Project) => {
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

  // 'e' is a FormEvent (submission)
  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

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