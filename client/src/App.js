import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Companies from "./pages/Companies";
import Roadmap from "./pages/Roadmap";
import Tasks from "./pages/Tasks";
import Practice from "./pages/Practice";

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
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </Router>
  );
}

export default App;