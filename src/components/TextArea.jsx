import React from "react";
import "../styles/journal.css";

const TextArea = ({ placeholder, value, onChange }) => {
  return (
    <textarea
      className="text-area"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextArea;