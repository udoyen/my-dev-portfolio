import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
    // 1. THE DATA (Usually comes from a database, here we mock it)
  const projects = [
    {
      id: 1,
      title: "DevFolio",
      role: "Frontend Developer",
      description: "My personal portfolio built with Next.js and Tailwind.",
      link: "/projects/devfolio"
    },
    {
      id: 2,
      title: "Task Master",
      role: "Backend Engineer",
      description: "A productivity app using Node.js and MongoDB.",
      link: "/projects/task-master"
    },
    {
      id: 3,
      title: "DevOps Pipeline",
      role: "Cloud Architect",
      description: "Automated CI/CD workflow using GitHub Actions.",
      link: "/projects/devops-pipeline"
    }
  ];
  return (
    <div className="p-24">
      <h1 className="text-3xl font-bold mb-8 text-center">My Work</h1>

      {/* 2. THE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 3. THE MAP (Loop) */}
        {projects.map((project) => (
          <ProjectCard 
            key={project.id}            // REQUIRED: Unique ID
            title={project.title}       // Pass title from data
            role={project.role}         // Pass role from data
            description={project.description} // Pass description
            link={project.link}         // Pass link from data
          />
        ))}
      </div>
    </div>
  );
}
