import { useState } from "react";
import API from "../services/api";
import SkillTreeGraph from "../components/SkillTreeGraph";
import BackButton from "../components/BackButton";

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
  <div className="min-h-screen bg-slate-900 text-white p-8">

    <div className="flex items-center justify-between mb-10">

      <BackButton />

      <div className="flex-1 text-center">

        <h1 className="text-4xl font-bold">
          SkillTree Roadmap
        </h1>

        <p className="text-slate-400 mt-2">
          Track your growth branch by branch
        </p>

      </div>

      <div className="w-40"></div>

    </div>

    <div className="max-w-5xl mx-auto">

      <div className="bg-slate-800 rounded-3xl p-6 shadow-xl mb-8">

        <h2 className="text-2xl font-semibold mb-4">
          Choose Career Path
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="flex-1 bg-slate-700 text-white p-3 rounded-xl border border-slate-600 outline-none"
          >
            <option value="">
              Select Role
            </option>

            <option value="Full Stack Developer">
              Full Stack Developer
            </option>

            <option value="AI Engineer">
              AI Engineer
            </option>

            <option value="Blockchain Developer">
              Blockchain Developer
            </option>

          </select>

          <button
            onClick={analyze}
            className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-xl font-semibold"
          >
            Analyze Skill Gap
          </button>

        </div>

      </div>

      {result && (

        <div className="bg-slate-800 rounded-3xl p-6 shadow-xl">

          <h2 className="text-3xl font-bold mb-6">
            Skill Progression Tree
          </h2>

          <SkillTreeGraph
            have={result.have}
            missing={result.missing}
          />

        </div>

      )}
      {!result && (

<div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center mt-8">

    <h2 className="text-2xl font-bold mb-2">
        No Roadmap Yet
    </h2>

    <p className="text-slate-400">
        Select a career role and click Analyze Skill Gap.
    </p>

</div>

)}
    </div>

  </div>
);
}

export default Roadmap;