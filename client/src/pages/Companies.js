import { useEffect, useState } from "react";
import API from "../services/api";
import BackButton from "../components/BackButton";
function Companies() {
const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  const student_id = localStorage.getItem("student_id");

useEffect(() => {

    setLoading(true);

    if (!student_id) {
        setLoading(false);
        return;
    }

    API.get(`/companies/eligibility/${student_id}`)
        .then((res) => {
            setCompanies(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setLoading(false);
        });

}, [student_id]);
if (loading) {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
                <p>Loading companies...</p>
            </div>
        </div>
    );
}

  return (
  <div className="min-h-screen bg-slate-900 text-white p-8">

    {/* Header */}

    <div className="flex items-center justify-between mb-10">

      <BackButton />

      <div className="flex-1 text-center">

        <h1 className="text-4xl font-bold">
          Opportunity Engine
        </h1>

        <p className="text-slate-400 mt-2">
          Discover companies based on your skills and readiness
        </p>

      </div>

      <div className="w-40"></div>

    </div>

    <div className="max-w-6xl mx-auto">

      {companies.length === 0 ? (

<div className="bg-slate-800 rounded-3xl p-10 text-center border border-slate-700">

    <h2 className="text-2xl font-bold mb-3">
        No Matching Companies
    </h2>

    <p className="text-slate-400">
        Upload your resume and improve your skills to unlock company recommendations.
    </p>

</div>

) : (

        <div className="grid md:grid-cols-2 gap-8">

          {companies.map((c) => (

            <div
              key={c.id}
              className={`rounded-3xl p-8 shadow-2xl border transition hover:scale-[1.02]
              ${
                c.status === "Eligible"
                  ? "bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/30"
                  : "bg-gradient-to-br from-slate-800 to-slate-900 border-red-500/20 opacity-90"
              }`}
            >

              {/* TOP */}

              <div className="flex justify-between items-start mb-8">

                <div>

                  <h2 className="text-3xl font-bold mb-2">

                    {c.status === "Eligible"
                      ? "Go!!"
                      : "Locked!!"}{" "}

                    {c.name}

                  </h2>

                  <p className="text-slate-400">
                    Minimum CGPA Required: {c.min_cgpa}
                  </p>

                </div>

                <div
                  className={`px-5 py-2 rounded-full text-sm font-bold
                  ${
                    c.status === "Eligible"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {c.status}
                </div>

              </div>

              {/* READINESS */}

              <div className="mb-8">

                <div className="flex justify-between mb-3">

                  <span className="font-semibold text-lg">
                    Readiness Match
                  </span>

                  <span className="font-bold text-cyan-400">
                    {c.readiness}%
                  </span>

                </div>

                <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">

                  <div
                    className={`h-5 rounded-full transition-all duration-700
                    ${
                      c.readiness >= 80
                        ? "bg-green-500"
                        : c.readiness >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${c.readiness}%`
                    }}
                  />

                </div>

              </div>

              {/* STRENGTHS */}

              <div className="mb-8">

                <h3 className="text-lg font-semibold mb-4 text-green-400">
                  Why You Match
                </h3>

                <div className="flex flex-wrap gap-3">

                  {c.strengths.length > 0 ? (

                    c.strengths.map((s, i) => (

                      <div
                        key={i}
                        className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-2xl text-sm"
                      >
                        {s}
                      </div>

                    ))

                  ) : (

                    <div className="text-slate-400">
                      No matching strengths yet
                    </div>

                  )}

                </div>

              </div>

              {/* MISSING */}

              <div className="mb-8">

                <h3 className="text-lg font-semibold mb-4 text-red-400">
                  Skills To Unlock Opportunity
                </h3>

                <div className="flex flex-wrap gap-3">

                  {c.missing.length > 0 ? (

                    c.missing.map((m, i) => (

                      <div
                        key={i}
                        className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-2xl text-sm"
                      >
                        {m}
                      </div>

                    ))

                  ) : (

                    <div className="text-green-400 font-semibold">
                      Fully matched!!!
                    </div>

                  )}

                </div>

              </div>

              {/* AI INSIGHT */}

              <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5">

                <p className="text-cyan-400 font-semibold mb-2">
                  AI Insight
                </p>

                <p className="text-slate-300 leading-7">

                  {c.status === "Eligible"

                    ? `Your profile aligns strongly with ${c.name}. Continue improving practical projects and DSA skills to maximize placement chances.`

                    : `You are close to unlocking ${c.name}. Focus on improving ${c.missing.join(", ")} to increase your readiness.`}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);
}

export default Companies;