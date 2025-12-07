import ProjectCard from "@/components/ProjectCard";
import { projects } from '@/data'; // <--- The new import!

export default function Projects() {
   
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
