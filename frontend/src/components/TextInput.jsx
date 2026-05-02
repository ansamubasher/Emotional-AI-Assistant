import React from "react";
import "../styles/journal.css";

const TextInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      className="text-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;