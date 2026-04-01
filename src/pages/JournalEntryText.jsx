import React, { useState } from "react";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import bg from "../assets/Background.png";
import heart from "../assets/heart.png";
import "../styles/journal.css";

const JournalEntryText = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");

  const handleSave = () => {
    
    console.log("Saved:", { title, entry });
  };

  return (
    <div className="journal-container">
      <img src={heart} alt="heart" className="heart-icon-T" />
      <h1 className="journal-title">Journal your day</h1>
      <TextInput placeholder="Enter Title" value={title} onChange={e => setTitle(e.target.value)} />
      <TextArea placeholder="Begin Journaling..." value={entry} onChange={e => setEntry(e.target.value)} />
      <Button label="Save" onClick={handleSave} />
    </div>
  );
};

export default JournalEntryText;