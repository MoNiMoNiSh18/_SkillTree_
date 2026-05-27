import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Resume() {

  const [file, setFile] = useState(null);

  const [skills, setSkills] = useState([]);

  const [readiness, setReadiness] = useState(0);

  const navigate = useNavigate();

  const upload = async () => {

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

    } catch (err) {

      console.error(err);

      alert("Upload failed");
    }
  };

  return (

    <div className="min-h-screen bg-slate-900 text-white p-6">

      <Navbar />

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-2">
            📄 AI Resume Analyzer
          </h1>

          <p className="text-slate-400">
            Analyze your resume and track placement readiness
          </p>

        </div>

        {/* UPLOAD SECTION */}

        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl mb-10">

          <h2 className="text-2xl font-semibold mb-6">
            Upload Resume
          </h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-6 block"
          />

          <button
            onClick={upload}
            className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-xl font-bold"
          >
            Analyze Resume
          </button>

        </div>

        {/* RESULTS */}

        {skills.length > 0 && (

          <div className="grid md:grid-cols-2 gap-8">

            {/* READINESS */}

            <div className="bg-slate-800 rounded-3xl p-8 shadow-xl">

              <h2 className="text-2xl font-bold mb-6">
                🌳 Placement Readiness
              </h2>

              <div className="w-full bg-slate-700 rounded-full h-8 overflow-hidden">

                <div
                  className={`h-8 text-center font-bold leading-8
                  ${
                    readiness >= 80
                      ? "bg-green-500"

                      : readiness >= 50
                      ? "bg-yellow-500"

                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${readiness}%`
                  }}
                >
                  {readiness}%
                </div>

              </div>

              <p className="mt-6 text-xl font-semibold">

                {
                  readiness >= 80
                  ? "🚀 Placement Ready"

                  : readiness >= 50
                  ? "⚡ Improving Fast"

                  : "🌱 Still Growing"
                }

              </p>

            </div>

            {/* DETECTED SKILLS */}

            <div className="bg-slate-800 rounded-3xl p-8 shadow-xl">

              <h2 className="text-2xl font-bold mb-6">
                ✅ Detected Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {skills.map((s, i) => (

                  <div
                    key={i}
                    className="bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-2xl"
                  >
                    {s}
                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Resume;