import React from "react";

const InputField = ({ type, placeholder, name, value, onChange }) => {
  return (
    <input
      className="bg-[#ccd6f6] mb-4 p-2"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default InputField;
