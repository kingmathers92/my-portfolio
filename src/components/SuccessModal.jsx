import React, { useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessModal = ({ isVisible, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg text-center relative"
      >
        <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Success!</h2>
        <p className="text-lg">Your message has been successfully submitted.</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
