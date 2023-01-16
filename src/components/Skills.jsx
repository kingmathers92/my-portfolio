import React from "react";

import HTML from "../assets/html.png";
import CSS from "../assets/css.png";
import JavaScript from "../assets/javascript.png";
import ReactImg from "../assets/react.png";
import Node from "../assets/node.png";
import GitHub from "../assets/github.png";
import Bootstrap from "../assets/bootstrap.png";
import Django from "../assets/django.png";
import Python from "../assets/python.png";
import Tailwind from "../assets/tailwind.png";

const Skills = () => {
  return (
    <div name="skills" className="w-full h-screen text-gray-300 mb-8">
      {/* Container */}
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div>
          <p className="skill text-4xl font-bold inline border-b-4 border-blue-600 ">
            Skills
          </p>
          <p className="py-4">// These are the technologies I've worked with</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8">
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={HTML}
              alt="HTML icon"
            />
            <p className="my-4">HTML</p>
          </div>
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={CSS}
              alt="CSS icon"
            />
            <p className="my-4">CSS</p>
          </div>
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={JavaScript}
              alt="Javascript icon"
            />
            <p className="my-4">JavaScript</p>
          </div>
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={ReactImg}
              alt="React icon"
            />
            <p className="my-4">React</p>
          </div>
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={Node}
              alt="Node icon"
            />
            <p className="my-4">Node</p>
          </div>
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={GitHub}
              alt="Github icon"
            />
            <p className="my-4">Github</p>
          </div>
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={Bootstrap}
              alt="Tailwind icon"
            />
            <p className="my-4">Bootstrap</p>
          </div>
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={Django}
              alt="Django icon"
            />
            <p className="my-4">Django</p>
          </div>
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={Python}
              alt="Django icon"
            />
            <p className="my-4">Python</p>
          </div>
          <div className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500">
            <img
              style={{ padding: "10px" }}
              className="w-20 mx-auto"
              src={Tailwind}
              alt="Django icon"
            />
            <p className="my-4">Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
