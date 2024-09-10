import React, { useState } from "react";
import emailjs from "emailjs-com";
import SuccessModal from "../components/SuccessModal";

const Newsletter = () => {
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);

    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(e.target.value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userEmail || emailError) {
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
        () => {
          emailjs
            .send(
              "service_3azu725",
              "template_gy3k9la",
              {
                to_name: "Subscriber",
                email: userEmail,
                from_name: "Khaled Ben Yahya",
              },
              "PmZfW_YwK4_ZVx6IF"
            )
            .then(
              () => {
                setShowSuccessModal(true);
                setIsSubmitting(false);
                setUserEmail("");
              },
              (error) => {
                console.log("Failed to send confirmation email", error.text);
                alert(
                  "Failed to send confirmation email. Please try again later."
                );
                setIsSubmitting(false);
              }
            );
        },
        (error) => {
          console.log("Failed to send subscription notification", error.text);
          alert("Failed to send your message. Please try again later.");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-8">
      <h2 className="text-4xl font-bold text-center mb-4">
        Subscribe to my Newsletter
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col max-w-md w-full"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={userEmail}
          onChange={handleEmailChange}
          className="p-2 border border-gray-300 rounded mb-4"
          required
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
        <button
          type="submit"
          disabled={isSubmitting || emailError}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      <SuccessModal
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default Newsletter;
