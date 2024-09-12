import React, { useState } from "react";
import { ScrollBackToTop } from "../components/index";
import InputField from "../components/InputField.jsx";
import TextArea from "../components/TextArea.jsx";
import { useFormValidation } from "../hooks/useFormValidation";
//import Newsletter from "../components/Newsletter";
import SuccessModal from "../components/SuccessModal";
import emailjs from "emailjs-com";

const Contact = ({ nav }) => {
  const { formData, errors, handleInputChange, validateForm } =
    useFormValidation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const honeypotValue = e.target.honeypot.value;
    if (!validateForm(honeypotValue)) {
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm(
        "service_3azu725",
        "template_nwwnc02",
        e.target,
        "PmZfW_YwK4_ZVx6IF"
      )
      .then(
        (result) => {
          console.log("Email successfully sent", result.text);
          setShowSuccessModal(true);
          setIsSubmitting(false);

          handleInputChange({ target: { name: "userEmail", value: "" } });
          handleInputChange({ target: { name: "userMessage", value: "" } });
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
          onChange={handleInputChange}
          required={true}
        />
        <InputField
          type="email"
          placeholder="Email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleInputChange}
          required={true}
        />
        {errors.userEmail && <p className="text-red-500">{errors.userEmail}</p>}
        <TextArea
          placeholder="Message"
          name="userMessage"
          value={formData.userMessage}
          onChange={handleInputChange}
        />
        <button
          disabled={
            isSubmitting ||
            !formData.userEmail ||
            !formData.userMessage ||
            errors.userEmail
          }
          type="submit"
          className="collab-btn text-white border-2 hover:bg-blue-600 hover:border-blue-600 px-4 py-3 my-8 mx-auto flex items-center hover:cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Let's Collaborate"}
        </button>
      </form>
      <SuccessModal
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      {/* <Newsletter /> */}
      {!nav && <ScrollBackToTop />}
    </div>
  );
};

export default Contact;
