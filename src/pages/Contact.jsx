import React, { useState } from "react";
import { ScrollBackToTop } from "../components/index";

const Contact = ({ nav }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessasge] = useState("");

  return (
    <div
      name="contact"
      className="w-full h-screen flex justify-center items-center p-8"
    >
      <form
        method="POST"
        action="https://getform.io/f/65c92a0f-7a6c-4355-83a7-dcd78c5a552f"
        className="flex flex-col max-w-[600px] w-full"
      >
        <div className="pb-6">
          <p className="text-4xl font-bold inline border-b-4 border-blue-600">
            Contact
          </p>
        </div>
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
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <textarea
          className="bg-[#ccd6f6] p-2"
          name="message"
          rows="5"
          placeholder="Message"
          onChange={(e) => setUserMessasge(e.target.value)}
          value={userMessage}
          required
        ></textarea>
        <button
          disabled={userEmail & (userMessage === "")}
          type="submit"
          className="text-white border-2 hover:bg-blue-600 hover:border-blue-600 px-4 py-3 my-8 mx-auto flex items-center"
        >
          Let's Collaborate
        </button>
      </form>
      {!nav && <ScrollBackToTop />}
    </div>
  );
};

export default Contact;
