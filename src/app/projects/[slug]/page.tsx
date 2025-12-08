import Link from "next/link";
import clientPromise from "@/lib/mongodb"; // <--- Import DB connection
import { notFound } from "next/navigation";

// Define the interface for TypeScript
interface Project {
  _id: string;
  title: string;
  role: string;
  description: string;
  link: string;
}

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  // 1. Get the slug from the URL (e.g. "task-master")
  const { slug } = await params; 

  // 2. Connect to MongoDB
  const client = await clientPromise;
  const db = client.db("portfolio_db");

  // 3. Find the project where the 'link' field ends with this slug
  // We construct the expected link format: "/projects/slug"
  const expectedLink = `/projects/${slug}`;

  // We search for an exact match on the link field
  const project = await db.collection("projects").findOne({ 
    link: expectedLink 
  }) as unknown as Project; // Cast to our interface

  // 4. Handle "Not Found"
  if (!project) {
    return (
      <div className="p-24 text-center">
        <h1 className="text-2xl font-bold text-red-500">Project Not Found</h1>
        <p className="mt-4">Could not find a project with slug: {slug}</p>
        <Link href="/projects" className="text-blue-400 mt-8 block hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  // 5. Render the Project
  return (
    <div className="p-24 text-center">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-xl text-blue-400 mb-8 uppercase tracking-widest">{project.role}</p>
      
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 whitespace-pre-line">
        {project.description}
      </p>

      <div className="bg-gray-800 p-6 rounded-lg inline-block text-left">
        <h3 className="text-xl font-bold mb-2 text-white">Project Details:</h3>
        <p className="text-gray-400">Database ID: {project._id.toString()}</p>
      </div>

      <div className="mt-10">
        <Link href="/projects" className="text-blue-500 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}