import { useState, useRef } from "react";
import { validateEmail } from "../utils/emailValidation";
import { validateMessage } from "../utils/messageValidation";

export const useFormValidation = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    userMessage: "",
  });
  const [errors, setErrors] = useState({});
  const errorTimerRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "userEmail") {
      error = validateEmail(value);
    } else if (name === "userMessage") {
      error = validateMessage(value);
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }

    if (error) {
      errorTimerRef.current = setTimeout(() => {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }, 3000);
    }
  };

  const validateForm = (honeypotValue) => {
    const hasErrors = Object.values(errors).some((error) => error);
    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    const lastSubmissionTime = localStorage.getItem("lastSubmissionTime");

    const canSubmit =
      !honeypotValue &&
      !hasErrors &&
      Date.now() - lastSubmissionTime > oneMonth;

    if (!canSubmit) {
      console.log("Form validation failed.");
      return false;
    }
    return true;
  };

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
  };
};
