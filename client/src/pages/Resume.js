import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

function Resume() {
const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [skills, setSkills] = useState([]);

  const [readiness, setReadiness] = useState(0);

  const navigate = useNavigate();
  const upload = async () => {
    setLoading(true)
    const student_id = localStorage.getItem("student_id");

    console.log(
      "Student ID from localStorage:",
      student_id
    );

    if (!student_id || student_id === "undefined") {

      alert("Session expired. Please login again.");

      navigate("/");

      return;
    }

    if (!file) {

      alert("Please select a file");

      return;
    }

    try {

      const formData = new FormData();

      formData.append("resume", file);

      formData.append("student_id", student_id);

      console.log("Sending ID:", student_id);

      const res = await API.post(
        "/ai/resume",
        formData
      );

      setSkills(res.data.detectedSkills);

      // FETCH READINESS SCORE

      const readinessRes = await API.get(
        `/readiness/${student_id}`
      );

      setReadiness(
        readinessRes.data.readiness_score
      );
      setLoading(false);
    } catch (err) {

      console.error(err);
      setLoading(false);
      alert("Upload failed");
    }
  };

return (
<div className="min-h-screen bg-slate-900 text-white">
    <BackButton />
    <div className="flex-1 p-10 overflow-y-auto">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold tracking-tight">
          Resume Hub
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Analyze and build professional ATS-friendly resumes.
        </p>

      </div>

      {/* ACTION CARDS */}

      <div className="grid md:grid-cols-2 gap-8 mb-10">

        {/* UPLOAD */}

        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-3">
            Upload Resume
          </h2>

          <p className="text-slate-400 mb-6">
            Upload your existing resume for AI skill analysis.
          </p>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-6 block w-full text-sm text-slate-300"
          />

          <button
    onClick={upload}
    disabled={loading}
    className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition px-6 py-3 rounded-2xl border border-slate-600"
>
    {loading ? "Analyzing Resume..." : "Analyze Resume"}
</button>

        </div>

        {/* CREATE */}

        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-3">
            Create Resume
          </h2>

          <p className="text-slate-400 mb-6">
            Build a clean ATS-friendly resume using SkillTree templates.
          </p>

          <Link
            to="/resume-builder"
            className="inline-block bg-cyan-500/20 hover:bg-cyan-500/30 transition px-6 py-3 rounded-2xl border border-cyan-500/20"
          >
            Create Resume
          </Link>

        </div>

      </div>

      {/* DETECTED SKILLS */}

      {skills.length > 0 && (

        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Detected Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {skills.map((s, i) => (

              <div
                key={i}
                className="bg-slate-700 px-4 py-2 rounded-full text-sm"
              >
                {s}
              </div>

            ))}

          </div>

        </div>

      )}

    </div>
</div>


);
}

export default Resume;