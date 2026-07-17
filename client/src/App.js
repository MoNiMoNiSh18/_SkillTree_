import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
        <Route path="/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
        <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
        <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>}/>
        <Route path="/interview" element={<ProtectedRoute><InterviewSimulator /></ProtectedRoute>}/>
        <Route path="/interview-session" element={<ProtectedRoute><InterviewSession /></ProtectedRoute>} />
        <Route path="/interview-report" element={<ProtectedRoute><InterviewReport /></ProtectedRoute>}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>
    </Router>
  );
}

export default App;