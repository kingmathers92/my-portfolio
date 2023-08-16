import React, { useState } from "react";
import { projectsData } from "../data/ProjectsData.js";
import { Pagination } from "../components/index";

const Work = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const sortedProjects = projectsData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const project = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div name="work" className="w-full md:h-screen text-gray-300">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-600">
            Work
          </p>
        </div>

        {/* container for projects */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Gird Item */}
          {project.map((item, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${item.image})` }}
              className="group container rounded-md
    flex justify-center text-center items-center mx-auto content-div"
            >
              {/* Hover effect for images */}
              <div className="opacity-0 group-hover:opacity-100 ">
                <span className="text-2xl font bold text-white tracking-wider">
                  {item.name}
                </span>
                <div className="pt-8 text-center ">
                  {/* eslint-disable-next-line */}
                  <a href={item.github} target="_blank">
                    <button
                      className="text-center rounded-lg px-4 py-3 m-2
             bg-white text-gray-700 font-bold text-lg"
                    >
                      Code
                    </button>
                  </a>
                  {/* Conditionally render the "Live" button */}
                  {item.live ? (
                    // eslint-disable-next-line
                    <a href={item.live} target="_blank">
                      <button
                        className="text-center rounded-lg px-4 py-3 m-2
               bg-white text-gray-700 font-bold text-lg"
                      >
                        Live
                      </button>
                    </a>
                  ) : (
                    <button
                      className="text-center rounded-lg px-4 py-3 m-2
             bg-white text-gray-700 font-bold text-lg opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Live
                    </button>
                  )}
                </div>
              </div>
            </div>
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