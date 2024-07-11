import React from "react";

const Project = ({ project }) => {
  const { live, github, name, image, logos } = project;

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="group object-contain rounded-md flex justify-center text-center items-center mx-auto content-div relative"
    >
      <div className="opacity-0 group-hover:opacity-100">
        <span className="text-2xl font-bold text-white tracking-wider">
          {name}
        </span>
        <div className="pt-8 text-center">
          <a href={github} target="_blank" rel="noreferrer">
            <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
              Code
            </button>
          </a>
          {live ? (
            <a href={live} target="_blank" rel="noreferrer">
              <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg">
                Live
              </button>
            </a>
          ) : (
            <button
              className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg opacity-50 cursor-not-allowed"
              disabled
            >
              Live
            </button>
          )}
        </div>
      </div>
      <div className="flex absolute bottom-0 border-b-0 w-60 p-2 overflow-hidden space-x-10 group rounded-md bg-[#0a192f]">
        <div className="flex space-x-10 animate-loop-scroll group-hover:paused">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={`Logo ${index + 1}`}
              className="max-w-none h-8"
            />
          ))}
        </div>
        <div className="flex space-x-10 animate-loop-scroll" aria-hidden={true}>
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={`Logo ${index + 1}`}
              className="max-w-none h-8"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
