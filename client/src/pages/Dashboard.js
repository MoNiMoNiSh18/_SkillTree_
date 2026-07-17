import { useEffect, useState } from "react";
import API from "../services/api";
import Chatbot from "../components/Chatbot";
import { Link,useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
function Dashboard() {
  const [readiness, setReadiness] = useState(0);
  const [skills, setSkills] = useState([]);
  const studentName =localStorage.getItem("name");
  const student_id = localStorage.getItem("student_id");
const navigate=useNavigate();
  useEffect(() => {

    API.get(`/skills/${student_id}`)
      .then(res => setSkills(res.data));

      API.get(`/readiness/${student_id}`)
  .then(res => setReadiness(res.data.readiness_score));

  }, [student_id]);
const handleLogout = () => {

    localStorage.clear();

    navigate("/");

};
  return (

  <div className="min-h-screen bg-[#0f172a] text-white flex">
<Sidebar />
    {/* MAIN CONTENT */}

    <div className="flex-1 p-10 overflow-y-auto">

      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold">Welcome back, {studentName}.</h1>

        <p className="text-slate-400 mt-3 text-lg">
        Monitor your skills, prepare for interviews, and stay on track for placements.        
        </p>

      </div>

      {/* CONTENT GRID */}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">

<h2 className="text-xl font-semibold">
Placement Readiness
</h2>

<h1 className="text-5xl font-bold text-cyan-400 mt-4">
{readiness}%
</h1>

<div className="w-full bg-slate-700 rounded-full h-3 mt-6">

<div

className="bg-cyan-500 h-3 rounded-full"

style={{
width:`${readiness}%`
}}

>

</div>

</div>

</div>
        {/* SKILLS */}

        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Your Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {
              skills.length===0 ?
              <p className="text-slate-400">
              Upload your resume to discover your skills.
              </p>
              :
            skills.map((s, i) => (

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
            <p className="text-slate-400 mb-5">
            Ask placement, resume or interview related questions.
            </p>
          <Chatbot />

        </div>

      </div>

    </div>

  </div>

);
}

export default Dashboard;