import Link from "next/link";
import { projects } from '@/data'; // <--- The new import!

export default async function ProjectDetail({ params }) {
  // 1. Get the slug (the 'variable' part of the URL)
  // In Next.js 15, params is a Promise, so we await it.
  const { slug } = await params; 


  // 3. FIND THE MATCH
  // We look for the project whose 'link' ends with our slug
  const project = projects.find((p) => p.link.endsWith(slug));

  // If no project matches (e.g. /projects/banana), show a basic error
  if (!project) {
    return <div className="p-24">Project not found!</div>;
  }

  return (
    <div className="p-24 text-center">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-xl text-blue-400 mb-8 uppercase tracking-widest">{project.role}</p>
      
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
        {project.description}
      </p>

      <div className="bg-gray-800 p-6 rounded-lg inline-block text-left">
        <h3 className="text-xl text-white font-bold mb-2">Project Details:</h3>
        <p className="text-white">This content is dynamically generated based on ID: {project.id}</p>
      </div>

      <div className="mt-10">
        <Link href="/projects" className="text-blue-500 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}