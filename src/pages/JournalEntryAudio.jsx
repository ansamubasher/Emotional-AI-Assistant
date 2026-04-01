import React, { useState } from "react";
import AudioInput from "../components/AudioInput";
import Button from "../components/Button";
import heart from "../assets/heart.png";
import "../styles/journal.css";
import Layout from "../components/Layout";

const JournalEntryAudio = () => {
  const handleSave = () => {
    
    console.log("Saved:");//Work this out
  };

  return (
    <Layout>
      <div className="content">
      <img src={heart} alt="heart" className="heart-icon-A" />
      <h1 className="journal-title">Journal your day</h1>
      <AudioInput />
      <Button label="Save" onClick={handleSave} />
    </div>
    </Layout>
  );
};

export default JournalEntryAudio;


// import React, { useState } from "react";
// import AudioInput from "../components/AudioInput";
// import Button from "../components/Button";
// import heart from "../assets/heart.png";
// import "../styles/journal.css";

// const JournalEntryAudio = () => {
//   const handleSave = () => {
    
//     console.log("Saved:");//Work this out
//   };

//   return (
//     <div className="journal-container">
//       <img src={heart} alt="heart" className="heart-icon-A" />
//       <h1 className="journal-title">Journal your day</h1>
//       <AudioInput />
//       <Button label="Save" onClick={handleSave} />
//     </div>
//   );
// };

// export default JournalEntryAudio;