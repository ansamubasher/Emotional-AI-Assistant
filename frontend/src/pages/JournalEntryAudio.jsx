import React, { useState } from "react";
import axios from "axios";
import AudioInput from "../components/AudioInput";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import heart from "../assets/heart.png";
import "../styles/journal.css";
import Layout from "../components/Layout";

const JournalEntryAudio = () => {
  const [title, setTitle] = useState("");
  const [audioData, setAudioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!title) {
      setMessage("Please enter a title for your audio journal.");
      return;
    }
    if (!audioData) {
      setMessage("Please record something before saving.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setMessage("User not logged in.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userStr);
      const userId = user.id || user._id;

      const response = await axios.post("http://localhost:3000/journals", {
        userId,
        title,
        type: "audio",
        audioData: audioData // This is the Base64 string
      });

      if (response.status === 201) {
        setMessage("Audio journal saved successfully!");
        setTitle("");
        setAudioData(null);
      }
    } catch (err) {
      console.error("Error saving audio journal:", err);
      setMessage(err.response?.data?.message || "Error saving audio journal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="content shift-up">
        <img src={heart} alt="heart" className="heart-icon-A" />
        <h1 className="journal-title">Journal your day</h1>
        <TextInput 
          placeholder="Enter Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        <AudioInput onAudioSave={(data) => setAudioData(data)} />
        
        {message && <p className={`status-message ${message.includes("Error") || message.includes("Please") || message.includes("not logged") ? "error" : "success"}`} style={{ color: message.includes("successfully") ? "#4caf50" : "#f44336", margin: "10px 0" }}>{message}</p>}
        
        <Button label={loading ? "Saving..." : "Save"} onClick={handleSave} disabled={loading} />
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