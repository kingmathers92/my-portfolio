import React, { useState, useEffect, useRef } from "react";
import { ScrollBackToTop } from "../components/index";
import VisitorCount from "../components/VisitorCount.jsx";
import { validateEmail } from "../utils/emailValidation.js";
import { validateMessage } from "../utils/messageValidtion.js";

const Contact = ({ nav }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);
  const errorTimerRef = useRef(null);

  useEffect(() => {
    fetch("https://khaledbenyahya.com")
      .then((response) => response.json())
      .then((data) => setVisitorCount(data.count))
      .catch((error) => console.error("Error fetching visitor count:", error));
  }, []);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    const error = validateEmail(email);
    setEmailError(error);

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }

    if (error) {
      errorTimerRef.current = setTimeout(() => {
        setEmailError("");
      }, 3000);
    }
  };

  const handleFormSubmit = (e) => {
    const error = validateEmail(userEmail);
    const messageError = validateMessage(userMessage);
    const honeypotValue = e.target.honeypot.value;
    const lastSubmissionTime = localStorage.getItem("lastSubmissionTime");
    const currentTime = new Date().getTime();

    const oneMonth = 30 * 24 * 60 * 60 * 1000;

    if (lastSubmissionTime && currentTime - lastSubmissionTime < oneMonth) {
      e.preventDefault();
      return;
    }

    localStorage.setItem("lastSubmissionTime", currentTime);

    if (messageError) {
      e.preventDefault();
      return;
    }
    if (honeypotValue) {
      e.preventDefault();
      return;
    }

    if (error) {
      e.preventDefault();
      setEmailError(error);

      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
      errorTimerRef.current = setTimeout(() => {
        setEmailError("");
      }, 3000);
    }
  };

  return (
    <div
      name="contact"
      id="contact"
      className="w-full h-screen flex flex-col justify-center items-center p-8"
    >
      <div className="mb-4 text-center">
        <p className="text-4xl font-bold inline border-b-4 border-blue-600">
          Contact
        </p>
        <VisitorCount visitorCount={visitorCount} />
      </div>
      <form
        onSubmit={handleFormSubmit}
        method="POST"
        action="https://getform.io/f/65c92a0f-7a6c-4355-83a7-dcd78c5a552f"
        className="flex flex-col max-w-screen-md w-full font-bold text-[#0A192F]"
      >
        <input type="text" name="honeypot" style={{ display: "none" }} />
        <input
          className="bg-[#ccd6f6] p-2"
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className="my-4 p-2 bg-[#ccd6f6]"
          type="email"
          placeholder="Email"
          name="email"
          value={userEmail}
          onChange={handleEmailChange}
          required
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
        <textarea
          className="bg-[#ccd6f6] p-2"
          name="message"
          rows="5"
          placeholder="Message"
          onChange={(e) => setUserMessage(e.target.value)}
          value={userMessage}
          required
        ></textarea>
        <button
          disabled={!userEmail || !userMessage || emailError}
          type="submit"
          className="collab-btn text-white border-2 hover:bg-blue-600 hover:border-blue-600 px-4 py-3 my-8 mx-auto flex items-center hover:cursor-pointer"
        >
          Let's Collaborate
        </button>
      </form>
      {!nav && <ScrollBackToTop />}
    </div>
  );
};

export default Contact;
