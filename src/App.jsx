import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalPage from "./pages/JournalPage";
import JournalEntryText from "./pages/JournalEntryText";
import JournalEntryAudio from "./pages/JournalEntryAudio";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/text-entry" element={<JournalEntryText />} />
        <Route path="/journal/audio-entry" element={<JournalEntryAudio />} />
      </Routes>
    </Router>
  );
}

export default App;