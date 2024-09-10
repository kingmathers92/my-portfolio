import { useState, useRef } from "react";
import { validateEmail } from "../utils/emailValidation";
import { validateMessage } from "../utils/messageValidation";

export const useFormValidation = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
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

  const handleMessageChange = (e) => {
    const message = e.target.value;
    setUserMessage(message);
    const error = validateMessage(message);
    setMessageError(error);

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }

    if (error) {
      errorTimerRef.current = setTimeout(() => {
        setMessageError("");
      }, 3000);
    }
  };

  const validateForm = (honeypotValue) => {
    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const lastSubmissionTime = localStorage.getItem("lastSubmissionTime");

    if (lastSubmissionTime && currentTime - lastSubmissionTime < oneMonth) {
      console.log("Submission blocked: Form submitted too recently.");
      return false;
    }

    if (honeypotValue || emailError || messageError) {
      return false;
    }

    return true;
  };

  return {
    userEmail,
    userMessage,
    emailError,
    messageError,
    handleEmailChange,
    handleMessageChange,
    validateForm,
  };
};
