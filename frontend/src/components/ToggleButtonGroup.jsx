import React, { useState } from "react";
import Button from "./Button";

const ToggleButtonGroup = ({mode, setMode}) => {
  return (
    <div className="toggle-group">
      <Button
        label="Text"
        active={mode === "Text"}
        onClick={() => setMode("Text")}
      />
      <Button
        label="Audio"
        active={mode === "Audio"}
        onClick={() => setMode("Audio")}
      />
    </div>
  );
};

export default ToggleButtonGroup;