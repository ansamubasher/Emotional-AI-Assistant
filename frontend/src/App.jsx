import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalPage from "./pages/JournalPage";
import JournalEntryText from "./pages/JournalEntryText";
import JournalEntryAudio from "./pages/JournalEntryAudio";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Lifestyle2 from "./pages/Lifestyle2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/text-entry" element={<JournalEntryText />} />
        <Route path="/journal/audio-entry" element={<JournalEntryAudio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lifestyle" element={<Lifestyle2 />} />
      </Routes>
    </Router>
  );
}

export default App;