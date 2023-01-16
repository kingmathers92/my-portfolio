import React from "react";
import { skillsData } from "../data/skillsData.js";

const Skills = () => {
  const skill = skillsData;
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
          {skill.map((item, index) => (
            <div
              key={index}
              className="skillsCard shadow-md shadow-[#040c16] hover:scale-110 duration-500"
            >
              <img
                style={{ padding: "10px" }}
                className="w-20 mx-auto"
                src={item.image}
                alt="HTML icon"
              />
              <p className="my-4">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
