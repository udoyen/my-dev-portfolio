import Link from 'next/link';

// 1. Define the Blueprint
interface ProjectCardProps {
  title: string;       // Must be text
  role: string;        // Must be text
  description: string; // Must be text
  link: string;        // Must be text
}

// This function takes 'props' (title, description) as input
export default function ProjectCard({ title, role, description, link }: ProjectCardProps) {
  return (
    <div className="group border border-gray-700 p-6 rounded-lg 
                    transition transform duration-300 ease-in-out 
                    hover:scale-105 hover:bg-gray-800 hover:shadow-xl">
      <Link href={link}><h2 className="text-xl font-bold mb-1
                      transition-colors duration-200 group-hover:text-white">
                        {title}</h2></Link>
      <span className="text-sm text-blue-400 uppercase tracking-widest">{role}</span>
      <p className="text-gray-300 mt-2">{description}</p>
    </div>
  );
}