import { useLocation, useNavigate } from "react-router-dom";

function ReviewAnswers() {
  const companyId = location.state?.companyId;
const companyName = location.state?.companyName;
  const location = useLocation();
  const navigate = useNavigate();

  const {
    questions,
    answers,
    company,
    role
  } = location.state;

  const submitInterview = () => {

  localStorage.removeItem("interviewAnswers");

 navigate("/interview-report", {
  state: {
    questions,
    answers,
    companyId,
    companyName,
    role
  }
});

};

  return (

    <div className="min-h-screen bg-[#0f172a] text-white p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Review Your Answers
        </h1>

        <p className="text-slate-400 mb-8">
          Verify every answer before submitting.
        </p>

        <div className="space-y-6">

          {questions.map((q, index) => (

            <div
              key={q.id}
              className="bg-slate-800 rounded-2xl p-6"
            >

              <div className="flex justify-between items-center">

                <h2 className="font-semibold">

                  Question {index + 1}

                </h2>

                {answers[index] ? (

                  <span className="text-green-400">
                    ✓ Answered
                  </span>

                ) : (

                  <span className="text-red-400">
                    Not Answered
                  </span>

                )}

              </div>

              <p className="text-slate-300 mt-3">

                {q.question}

              </p>

              <div className="mt-4 bg-slate-900 rounded-xl p-4">

                {answers[index] || (
                  <span className="text-slate-500">
                    No answer provided.
                  </span>
                )}

              </div>

            </div>

          ))}

        </div>

        <div className="flex justify-end mt-8">

          <button

            onClick={submitInterview}

            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"

          >

            Confirm & Submit

          </button>

        </div>

      </div>

    </div>

  );

}

export default ReviewAnswers;