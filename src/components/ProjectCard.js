// This function takes 'props' (title, description) as input
export default function ProjectCard({ title, role, description }) {
  return (
    <div className="border border-gray-700 p-6 rounded-lg mb-4 hover:bg-gray-800 transition">
      <h2 className="text-xl font-bold mb-1">{title}</h2>
      <span className="text-sm text-blue-400 uppercase tracking-widest">{role}</span>
      <p className="text-gray-300 mt-2">{description}</p>
    </div>
  );
}