import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import axios from "axios";

const Home = () => {
  const [quote, setQuote] = useState("");
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        let quoteFound = false;
        while (!quoteFound) {
          const response = await axios.get(
            "https://api.quotable.io/random?tags=technology"
          );
          if (response.data.content.length <= 80) {
            setQuote(response.data.content);
            quoteFound = true;
            // Set a small delay before showing the quote
            setTimeout(() => setQuoteVisible(true), 500);
          }
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div name="about" id="about" className="w-full h-screen pt-0 pb-0 relative">
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
          I’m a Software Developer specializing in building exceptional digital
          experiences. Currently, I’m focused on building responsive full-stack
          web applications.
        </p>
        <p className="about font-semibold left-animate">Let’ Collaborate!</p>
        <div>
          <Link to="work" smooth={true} duration={500}>
            <button className="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-blue-600 hover:border-blue-600">
              View Work
            </button>
          </Link>
        </div>
      </div>
      {quote && (
        <div
          className={`
      absolute bottom-8 sm:bottom-12 md:bottom-16 right-4 sm:right-8 md:right-12 lg:right-16
      max-w-[80%] sm:max-w-sm md:max-w-md lg:max-w-lg
      transition-all duration-1000 ease-out
      ${quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
    `}
        >
          <div className="relative">
            <div className="absolute -top-3 left-4 w-8 h-8 sm:w-12 sm:h-12 bg-secondary-color opacity-20 rounded-full"></div>
            <div className="absolute -bottom-3 right-4 w-6 h-6 sm:w-8 sm:h-8 bg-secondary-color opacity-20 rounded-full"></div>
            <div className="bg-primary-color bg-opacity-80 backdrop-filter backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border border-secondary-color border-opacity-30">
              <p className="quote text-base sm:text-lg md:text-xl font-normal italic leading-relaxed">
                "{quote}"
              </p>
              <div className="mt-3 sm:mt-4 w-8 sm:w-12 h-0.5 sm:h-1 bg-secondary-color"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
