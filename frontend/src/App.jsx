import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalPage from "./pages/JournalPage";
import JournalEntryText from "./pages/JournalEntryText";
import JournalEntryAudio from "./pages/JournalEntryAudio";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import EmpathyChat from "./pages/EmpathyChat";
import Lifestyle from "./pages/Lifestyle";
import Lifestyle2 from "./pages/Lifestyle2";
import Signup from "./pages/Signup";
import StressEvaluation from "./pages/StressEvaluation";
import StressPage from "./pages/StressPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"               element={<Signup />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/dashboard"      element={<Dashboard />} />
        <Route path="/journal"        element={<JournalPage />} />
        <Route path="/journal/text"   element={<JournalEntryText />} />
        <Route path="/journal/audio"  element={<JournalEntryAudio />} />
        <Route path="/empathy"        element={<EmpathyChat />} />
        <Route path="/lifestyle"      element={<Lifestyle />} />
        <Route path="/lifestyle2"     element={<Lifestyle2 />} />
        <Route path="/stress-evaluation" element={<StressEvaluation />} />
        <Route path="/stress"         element={<StressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
