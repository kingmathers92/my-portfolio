import React, { useState } from "react";
import { projectsData } from "../data/ProjectsData.js";
import { Pagination } from "../components/index";
import Project from "../components/Project";
import AnimatedElement from "../components/AnimatedElements.jsx";

const Work = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const sortedProjects = projectsData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const projectSlice = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div name="work" id="work" className="w-full md:h-screen text-gray-300">
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-600">
            Work
          </p>
        </div>

        {/* Container for projects */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {/* Grid Item */}
          {projectSlice.map((project, index) => (
            <AnimatedElement key={project.id} delay={index * 200}>
              <Project key={project.id} project={project} />
            </AnimatedElement>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Work;
