import { useLocation, useNavigate } from "react-router-dom";

function InterviewReport() {

    const location = useLocation();
    const navigate = useNavigate();
    const questions = location.state?.questions || [];
    const answers = location.state?.answers || {};
    const companyName = location.state?.companyName;
    const role = location.state?.role;

    const answered = Object.values(answers).filter(
        answer => answer.trim() !== ""
    ).length;

    const overall = Math.round(
        (answered / questions.length) * 100
    );

    return (

        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">

  <div className="bg-slate-800 rounded-3xl p-10 w-full max-w-3xl">

    <h1 className="text-4xl font-bold mb-3">
      {companyName} Interview Report
    </h1>

    <p className="text-slate-400 mb-8">
      {role}
    </p>

    <div className="text-center mb-8">

      <h2 className="text-6xl font-bold text-green-400">
        {overall}%
      </h2>

      <p className="text-slate-300 mt-2">
        Answered {answered} of {questions.length} questions
      </p>

    </div>

  </div>
      <div className="flex justify-center gap-4 mt-10">

  <button
    onClick={() => navigate("/interview")}
    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
  >
    Take Another Interview
  </button>

  <button
    onClick={() => navigate("/dashboard")}
    className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl"
  >
    Back to Dashboard
  </button>

</div>
</div>

    );

}

export default InterviewReport;