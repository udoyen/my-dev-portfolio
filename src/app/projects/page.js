import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <div className="p-24">
      <h1 className="text-3xl font-bold mb-8 text-center">My Work</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Instance 1 */}
        <ProjectCard 
          title="DevFolio" 
          role="Frontend Developer"
          description="A personal portfolio website built with Next.js, Tailwind CSS, and custom components."
        />

        {/* Instance 2 */}
        <ProjectCard 
          title="Technical Docs" 
          role="Technical Writer"
          description="A documentation site simplifying complex DevOps concepts for beginners."
        />
      </div>
    </div>
  );
}
