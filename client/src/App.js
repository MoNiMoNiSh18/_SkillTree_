import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Companies from "./pages/Companies";
import Roadmap from "./pages/Roadmap";
import Practice from "./pages/Practice";
import ResumeBuilder from "./pages/ResumeBuilder";
import InterviewSimulator from "./pages/InterviewSimulator";
import InterviewSession from "./pages/InterviewSession";
import InterviewReport from "./pages/InterviewReport";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/resume-builder" element={<ResumeBuilder />}/>
        <Route path="/interview" element={<InterviewSimulator />}/>
        <Route path="/interview-session" element={<InterviewSession />} />
        <Route path="/interview-report" element={<InterviewReport />}/>
      </Routes>
    </Router>
  );
}

export default App;