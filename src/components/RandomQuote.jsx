import React, { useEffect, useState } from "react";
import quotes from "../data/Quotes"; // Import the quotes

const RandomQuote = () => {
  const [quote, setQuote] = useState({});
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };

    const newQuote = getRandomQuote();
    setQuote(newQuote);

    setTimeout(() => setQuoteVisible(true), 500);
  }, []);

  return (
    <>
      {quote.text && (
        <div
          className={`
            absolute bottom-8 sm:bottom-12 md:bottom-16 right-4 sm:right-8 md:right-12 lg:right-16
            max-w-[80%] sm:max-w-sm md:max-w-md lg:max-w-lg
            transition-all duration-1000 ease-out
            ${
              quoteVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
          `}
        >
          <div className="relative">
            <div className="absolute -top-3 left-4 w-8 h-8 sm:w-12 sm:h-12 bg-secondary-color opacity-20 rounded-full"></div>
            <div className="absolute -bottom-3 right-4 w-6 h-6 sm:w-8 sm:h-8 bg-secondary-color opacity-20 rounded-full"></div>
            <div className="bg-primary-color quote-container bg-opacity-80 backdrop-filter backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border border-secondary-color border-opacity-30">
              <p className="quote text-base sm:text-lg md:text-xl font-normal italic leading-relaxed">
                "{quote.text}"
              </p>
              <p className="author text-right text-sm mt-2">- {quote.author}</p>
              <div className="mt-3 sm:mt-4 w-8 sm:w-12 h-0.5 sm:h-1 bg-secondary-color"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RandomQuote;
