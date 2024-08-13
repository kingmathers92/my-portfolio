import React from "react";
import { skillsData } from "../data/SkillsData.js";
import { AnimatedElement } from "../components/index";
const Skills = () => {
  const skill = skillsData;

  return (
    <div
      name="skills"
      id="skills"
      className="w-full md:h-screen text-gray-300 mb-8"
    >
      {/* Container */}
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div>
          <p className="text-4xl font-bold inline border-b-4 border-blue-600">
            Skills
          </p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8 transform: none; transform-origin: 50% -10000% 0px;">
          {skill.map((item, index) => (
            <AnimatedElement key={index} delay={index * 100}>
              <div
                key={index}
                className="font-bold rounded-md hover:scale-110 duration-500 group flex flex-col items-center justify-center p-5"
              >
                <img
                  src={item.image}
                  alt={`Logo ${index + 1}`}
                  className="max-w-none h-8"
                />
                <p className="my-4">{item.name}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
