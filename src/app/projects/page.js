"use client"; // <--- Required because we are using State and Effects

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This function runs automatically when the user visits the page
    async function fetchData() {
      try {
        const response = await fetch('/api/projects'); // Call your own API
        const data = await response.json();
        setProjects(data); // Save the cloud data to state
        setIsLoading(false); // Turn off loading spinner
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-24 text-center text-xl animate-pulse">
        Loading Cloud Data...
      </div>
    );
  }

  return (
    <div className="p-24">
      <h1 className="text-3xl font-bold mb-8 text-center">My Work (Cloud Connected)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard 
            key={project._id} // MongoDB uses '_id', not 'id'
            title={project.title}
            role={project.role}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}