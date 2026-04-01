import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalPage from "./pages/JournalPage";
import JournalEntryText from "./pages/JournalEntryText";
import JournalEntryAudio from "./pages/JournalEntryAudio";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JournalPage />} />
        <Route path="/text-entry" element={<JournalEntryText />} />
        <Route path="/audio-entry" element={<JournalEntryAudio />} />
      </Routes>
    </Router>
  );
}

export default App;