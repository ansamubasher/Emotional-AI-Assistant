import React, { useState } from "react";
import axios from "axios";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import heart from "../assets/heart.png";
import "../styles/journal.css";
import Layout from "../components/Layout";

const JournalEntryText = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!title || !entry) {
      setMessage("Title and entry are required.");
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
      const userId = user.id || user._id; // Handle both id and _id

      const response = await axios.post("http://localhost:3000/journals", {
        userId,
        title,
        type: "text",
        content: entry
      });

      if (response.status === 201) {
        setMessage("Journal saved successfully!");
        setTitle("");
        setEntry("");
      }
    } catch (err) {
      console.error("Error saving journal:", err);
      setMessage(err.response?.data?.message || "Error saving journal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="content">
        <img src={heart} alt="heart" className="heart-icon-T" />
        <h1 className="journal-title">Journal your day</h1>
        <TextInput placeholder="Enter Title" value={title} onChange={e => setTitle(e.target.value)} />
        <TextArea placeholder="Begin Journaling..." value={entry} onChange={e => setEntry(e.target.value)} />
        
        {message && <p className={`status-message ${message.includes("Error") || message.includes("required") || message.includes("not logged") ? "error" : "success"}`} style={{ color: message.includes("successfully") ? "#4caf50" : "#f44336", marginBottom: "10px" }}>{message}</p>}
        
        <Button label={loading ? "Saving..." : "Save"} onClick={handleSave} disabled={loading} />
      </div>
    </Layout>
  );
};

export default JournalEntryText;

// import React, { useState } from "react";
// import TextInput from "../components/TextInput";
// import TextArea from "../components/TextArea";
// import Button from "../components/Button";
// import bg from "../assets/Background.png";
// import heart from "../assets/heart.png";
// import "../styles/journal.css";

// const JournalEntryText = () => {
//   const [title, setTitle] = useState("");
//   const [entry, setEntry] = useState("");

//   const handleSave = () => {
    
//     console.log("Saved:", { title, entry });
//   };

//   return (
//     <div className="journal-container">
//       <img src={heart} alt="heart" className="heart-icon-T" />
//       <h1 className="journal-title">Journal your day</h1>
//       <TextInput placeholder="Enter Title" value={title} onChange={e => setTitle(e.target.value)} />
//       <TextArea placeholder="Begin Journaling..." value={entry} onChange={e => setEntry(e.target.value)} />
//       <Button label="Save" onClick={handleSave} />
//     </div>
//   );
// };

// export default JournalEntryText;