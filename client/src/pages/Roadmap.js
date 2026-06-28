import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import SkillTreeGraph from "../components/SkillTreeGraph";

function Roadmap() {

  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);

  const student_id = localStorage.getItem("student_id");

  const analyze = async () => {

    try {

      const res = await API.post(
        `/roadmap/${student_id}`,
        { role }
      );

      setResult(res.data);

    } catch (err) {

      console.log(err);

      alert("Failed to analyze roadmap");
    }
  };

  return (

    <div className="min-h-screen bg-slate-900 text-white p-6">

      <Navbar />

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-2">
            🌳 SkillTree Roadmap
          </h1>

          <p className="text-slate-400">
            Track your growth branch by branch
          </p>

        </div>

        {/* SELECT ROLE */}

        <div className="bg-slate-800 rounded-3xl p-6 shadow-xl mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Choose Career Path
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <select
            className="bg-slate-800 text-white p-3 rounded-xl border border-slate-600"
            onChange={(e) => setRole(e.target.value)}
            >

              <option className="text-black">Select Role</option>

              <option className="text-black">Full Stack Developer</option>

              <option className="text-black">AI Engineer</option>

              <option className="text-black">Blockchain Developer</option>

            </select>

            <button
              onClick={analyze}
              className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-4 rounded-xl font-bold"
            >
              Analyze Skill Gap
            </button>

          </div>

        </div>

{result && (

  <div className="mt-10">

    <h2 className="text-3xl font-bold mb-6">
      🌳 Skill Progression Tree
    </h2>

    <SkillTreeGraph
      have={result.have}
      missing={result.missing}
    />

  </div>

)}
      </div>

    </div>
  );
}

export default Roadmap;