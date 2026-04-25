import React from "react";

const ArrowButton = ({ onClick }) => {
  return (
    <button className="arrow-button" onClick={onClick}>
      ➡
    </button>
  );
};

export default ArrowButton;