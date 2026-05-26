import { useEffect, useState } from "react";
import API from "../services/api";
import Chatbot from "../components/Chatbot";
import { Link } from "react-router-dom";

function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [progress, setProgress] = useState({});
  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    API.get(`/skills/${student_id}`)
      .then(res => setSkills(res.data));
    API.get(`/tasks/progress/${student_id}`)
      .then(res => setProgress(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <h3>Level: {progress.level_no}</h3>
      <h3>XP: {progress.xp}</h3>
      <h3>🔥 Streak: {progress.streak}</h3>
      <h3>Your Skills:</h3>
      <ul>
        {[...new Map(skills.map(s => [s.name, s])).values()].map((s, i) => (
  <li key={i}>{s.name}</li>
))}
      </ul>
        <Link to="/resume">Upload Resume</Link>
        <br />
        <Link to="/companies">View Companies</Link>
        <br />
        <Link to="/roadmap">Skill Roadmap</Link>
        <br />
        <Link to="/tasks">Daily Tasks</Link>
        <br />
        <Link to="/practice">Practice Arena</Link>
      <Chatbot />
    </div>
  );
}

export default Dashboard;