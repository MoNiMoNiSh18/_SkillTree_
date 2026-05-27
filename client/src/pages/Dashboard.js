import { useEffect, useState } from "react";
import API from "../services/api";
import Chatbot from "../components/Chatbot";
import { Link } from "react-router-dom";

function Dashboard() {
const [readiness, setReadiness] = useState(0);
  const [skills, setSkills] = useState([]);
  const [progress, setProgress] = useState({});

  const student_id = localStorage.getItem("student_id");

  useEffect(() => {

    API.get(`/skills/${student_id}`)
      .then(res => setSkills(res.data));

    API.get(`/tasks/progress/${student_id}`)
      .then(res => setProgress(res.data));

      API.get(`/readiness/${student_id}`)
  .then(res => setReadiness(res.data.readiness_score));

  }, [student_id]);

  return (

    <div className="min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-4xl font-bold mb-8">
        🌳 SkillTree Dashboard
      </h1>

      {/* TOP CARDS */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            ⚡ XP
          </h2>

          <p className="text-3xl font-bold text-cyan-400">
            {progress.xp || 0}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            🏆 Level
          </h2>

          <p className="text-3xl font-bold text-green-400">
            {progress.level_no || 1}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            🔥 Streak
          </h2>

          <p className="text-3xl font-bold text-orange-400">
            {progress.streak || 0}
          </p>
        </div>
        
      </div>

      {/* MAIN GRID */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* SKILLS */}

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-4">
            🚀 Your Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {skills.map((s, i) => (

              <span
                key={i}
                className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full"
              >
                {s.name}
              </span>

            ))}

          </div>
        </div>

        {/* QUICK ACTIONS */}

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-4">
            ⚙ Quick Actions
          </h2>

          <div className="flex flex-col gap-4">

            <Link
              to="/resume"
              className="bg-cyan-500 hover:bg-cyan-600 transition p-3 rounded-xl text-center font-semibold"
            >
              Upload Resume
            </Link>

            <Link
              to="/companies"
              className="bg-green-500 hover:bg-green-600 transition p-3 rounded-xl text-center font-semibold"
            >
              View Companies
            </Link>

            <Link
              to="/tasks"
              className="bg-orange-500 hover:bg-orange-600 transition p-3 rounded-xl text-center font-semibold"
            >
              Daily Tasks
            </Link>
            <Link
            to="/roadmap"
            className="bg-pink-500 hover:bg-pink-600 transition p-3 rounded-xl text-center font-semibold"
            >
            Career Roadmap
            </Link>
            <Link
              to="/practice"
              className="bg-purple-500 hover:bg-purple-600 transition p-3 rounded-xl text-center font-semibold"
            >
              Practice Arena
            </Link>

          </div>

        </div>

      </div>

      {/* CHATBOT */}

      <div className="mt-8 bg-slate-800 rounded-2xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          🤖 AI Assistant
        </h2>

        <Chatbot />

      </div>

    </div>
  );
}

export default Dashboard;