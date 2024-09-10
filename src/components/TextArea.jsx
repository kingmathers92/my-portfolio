import React from "react";

const TextAreaField = ({ placeholder, name, value, onChange }) => {
  return (
    <textarea
      className="bg-[#ccd6f6] p-2"
      name={name}
      rows="5"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    ></textarea>
  );
};

export default TextAreaField;
