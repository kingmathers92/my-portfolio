import React, { useState, useRef } from "react";
import { ScrollBackToTop } from "../components/index";
import VisitorCount from "../components/VisitorCount.jsx";
import InputField from "../components/InputField.jsx";
import TextArea from "../components/TextArea.jsx";
import { validateEmail } from "../utils/emailValidation.js";
import { validateMessage } from "../utils/messageValidation.js";
import emailjs from "emailjs-com";

const Contact = ({ nav }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorTimerRef = useRef(null);

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
    e.preventDefault();
    setIsSubmitting(true);

    const error = validateEmail(userEmail);
    const messageError = validateMessage(userMessage);
    const honeypotValue = e.target.honeypot.value;

    if (error || messageError || honeypotValue) {
      setEmailError(error || messageError);
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Email successfully sent", result.text);
          alert("Your message has been successfully submitted!");
          setIsSubmitting(false);
          setUserEmail("");
          setUserMessage("");
        },
        (error) => {
          console.log("Failed to send email", error.text);
          alert("Failed to send your message. Please try again later.");
          setIsSubmitting(false);
        }
      );
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
        <VisitorCount />
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col max-w-screen-md w-full font-bold text-[#0A192F]"
      >
        <input type="text" name="honeypot" style={{ display: "none" }} />
        <InputField
          type="text"
          placeholder="Name"
          name="name"
          required={true}
        />
        <InputField
          type="email"
          placeholder="Email"
          name="email"
          value={userEmail}
          onChange={handleEmailChange}
          required={true}
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
        <TextArea
          placeholder="Message"
          name="message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button
          disabled={isSubmitting || !userEmail || !userMessage || emailError}
          type="submit"
          className="collab-btn text-white border-2 hover:bg-blue-600 hover:border-blue-600 px-4 py-3 my-8 mx-auto flex items-center hover:cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Let's Collaborate"}
        </button>
      </form>
      {!nav && <ScrollBackToTop />}
    </div>
  );
};

export default Contact;
