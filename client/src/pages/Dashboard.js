import { useEffect, useState } from "react";
import API from "../services/api";
import Chatbot from "../components/Chatbot";
import { Link } from "react-router-dom";

function Dashboard() {
  const [readiness, setReadiness] = useState(0);
  const [skills, setSkills] = useState([]);

  const student_id = localStorage.getItem("student_id");

  useEffect(() => {

    API.get(`/skills/${student_id}`)
      .then(res => setSkills(res.data));

      API.get(`/readiness/${student_id}`)
  .then(res => setReadiness(res.data.readiness_score));

  }, [student_id]);

  return (

  <div className="min-h-screen bg-[#0f172a] text-white flex">

    {/* SIDEBAR */}

    <div className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">

      <div>

        {/* LOGO */}

        <div className="mb-12">

          <h1 className="text-3xl font-bold tracking-tight">
            SkillTree
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            AI Career Ecosystem
          </p>

        </div>

        {/* NAVIGATION */}

        <div className="flex flex-col gap-3">

          <Link
            to="/dashboard"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-2xl border border-slate-700"
          >
            Dashboard
          </Link>

          <Link
            to="/resume"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-2xl border border-slate-700"
          >
            Resume
          </Link>

          <Link
            to="/companies"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-2xl border border-slate-700"
          >
            Companies
          </Link>
          <Link
              to="/interview"
              className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-2xl border border-slate-700"
          >
              Interview Simulator
          </Link>
          <Link
            to="/roadmap"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-2xl border border-slate-700"
          >
            Career Roadmap
          </Link>

          <Link
            to="/practice"
            className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-2xl border border-slate-700"
          >
            Practice Arena
          </Link>

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="bg-red-500/10 hover:bg-red-500/20 transition p-4 rounded-2xl border border-red-500/20"
      >
        Logout
      </button>

    </div>

    {/* MAIN CONTENT */}

    <div className="flex-1 p-10 overflow-y-auto">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, Monish.
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Track your growth and placement journey.
        </p>

      </div>

      {/* CONTENT GRID */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* SKILLS */}

        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Your Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {skills.map((s, i) => (

              <span
                key={i}
                className="bg-slate-700 px-4 py-2 rounded-full text-sm"
              >
                {s.name}
              </span>

            ))}

          </div>

        </div>

        {/* AI MENTOR */}

        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            AI Mentor
          </h2>

          <Chatbot />

        </div>

      </div>

    </div>

  </div>

);
}

export default Dashboard;