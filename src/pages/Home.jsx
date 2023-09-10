import React from "react";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div name="home" className="w-full h-screen pt-0 pb-0">
      {/* Container */}
      <div className="max-w-screen-lg mx-auto px-8 flex flex-col justify-center h-full">
        <p className="hi left-animate font-semibold">Hi, my name is</p>
        <h1 className="name text-2xl sm:text-4xl font-bold text-[#ccd6f6] right-animate">
          Khaled Ben Yahya 👋
        </h1>
        <h2 className="web text-4xl sm:text-7xl font-bold text-[#8892b0] left-animate">
          I'm a Software Developer.
        </h2>
        <p className="about text-[#8892b0] font-semibold py-4 max-w-screen-md right-animate">
          I’m Software Developer specializing in building exceptional digital
          experiences. Currently, I’m focused on building responsive
          full-stack web applications.
        </p>
        <p className="about font-semibold left-animate">
          What would you do if you had a software expert available at your
          fingertips?
        </p>
        <div>
          <Link to="work" smooth={true} duration={500}>
            <button className="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-blue-600 hover:border-blue-600">
              View Work
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
