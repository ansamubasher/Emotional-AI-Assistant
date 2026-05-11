import React from "react";
import "../styles/InputField.css"



function InputField({ name, value, onChange, placeholder, type = "text" }) {
  return (
    <input
      name={name}
      type={type}
      className="field"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
export default InputField;

