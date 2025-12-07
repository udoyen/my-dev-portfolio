// This function takes 'props' (title, description) as input
export default function ProjectCard({ title, role, description }) {
  // 1. THE DATA (Usually comes from a database, here we mock it)
  const projects = [
    {
      id: 1,
      title: "DevFolio",
      role: "Frontend Developer",
      description: "My personal portfolio built with Next.js and Tailwind."
    },
    {
      id: 2,
      title: "Task Master",
      role: "Backend Engineer",
      description: "A productivity app using Node.js and MongoDB."
    },
    {
      id: 3,
      title: "DevOps Pipeline",
      role: "Cloud Architect",
      description: "Automated CI/CD workflow using GitHub Actions."
    }
  ];
  return (
    <div className="group border border-gray-700 p-6 rounded-lg 
                    transition transform duration-300 ease-in-out 
                    hover:scale-105 hover:bg-gray-800 hover:shadow-xl">
      <h2 className="text-xl font-bold mb-1
                      transition-colors duration-200 group-hover:text-white">{title}</h2>
      <span className="text-sm text-blue-400 uppercase tracking-widest">{role}</span>
      <p className="text-gray-300 mt-2">{description}</p>
    </div>
  );
}