import React from "react";
import { skillsData } from "../data/SkillsData.js";

const Skills = () => {
  const skill = skillsData;
  return (
    <div name="skills" className="w-full md:h-screen text-gray-300 mb-8">
      {/* Container */}
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div>
          <p className="skill text-4xl font-bold inline border-b-4 border-blue-600 ">
            Skills
          </p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8 transform: none; transform-origin: 50% -10000% 0px;">
          {skill.map((item, index) => (
            <div
              key={index}
              className="skillsCard rounded-md hover:scale-110 duration-500 group"
            >
              <img
                style={{ padding: "10px" }}
                className="w-30 h-20 mx-auto"
                src={item.image}
                alt="icon"
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