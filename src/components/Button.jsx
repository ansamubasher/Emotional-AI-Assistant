import React from "react";
import "../styles/journal.css";

const Button = ({ label, active, onClick }) => {
  return (
    <button
      className={`btn ${active ? "btn-active" : "btn-outline"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;