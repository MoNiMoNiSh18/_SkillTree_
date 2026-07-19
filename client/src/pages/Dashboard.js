import { useEffect, useState } from "react";
import API from "../services/api";
import Chatbot from "../components/Chatbot";
import Sidebar from "../components/Sidebar";

function Dashboard() {
const [loading, setLoading] = useState(true);
  const [readiness, setReadiness] = useState(0);
  const [skills, setSkills] = useState([]);
  const studentName =localStorage.getItem("name");
  const student_id = localStorage.getItem("student_id");

  useEffect(() => {

    setLoading(true);

    Promise.all([
        API.get(`/skills/${student_id}`),
        API.get(`/readiness/${student_id}`)
    ])
    .then(([skillsRes, readinessRes]) => {

        setSkills(skillsRes.data);
        setReadiness(readinessRes.data.readiness_score);

    })
    .finally(() => {

        setLoading(false);

    });

}, [student_id]);
if (loading) {

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

            <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mx-auto mb-4"></div>

                <p>Loading dashboard...</p>

            </div>

        </div>

    );

}
  return (

  <div className="min-h-screen bg-[#0f172a] text-white flex">
<Sidebar />

    <div className="flex-1 p-10 overflow-y-auto">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">Welcome back, {studentName}.</h1>

        <p className="text-slate-400 mt-3 text-lg">
        Monitor your skills, prepare for interviews, and stay on track for placements.        
        </p>

      </div>

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