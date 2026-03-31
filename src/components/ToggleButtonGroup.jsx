import React, { useState } from "react";
import Button from "./Button";

const ToggleButtonGroup = () => {
  const [selected, setSelected] = useState("Text");

  return (
    <div className="toggle-group">
      <Button
        label="Text"
        active={selected === "Text"}
        onClick={() => setSelected("Text")}
      />
      <Button
        label="Audio"
        active={selected === "Audio"}
        onClick={() => setSelected("Audio")}
      />
    </div>
  );
};

export default ToggleButtonGroup;