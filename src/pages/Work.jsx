import React, { useState } from "react";
import { projectsData } from "../data/ProjectsData.js";
import { Pagination } from "../components/index";
import Project from "../components/Project"; // Import the Project component

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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Grid Item */}
          {projectSlice.map((project) => (
            <Project key={project.id} project={project} />
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
