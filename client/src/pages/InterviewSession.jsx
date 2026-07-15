import { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressBar from "../components/interview/ProgressBar";
import Timer from "../components/interview/Timer";
import QuestionCard from "../components/interview/QuestionCard";

import { googleFullStackQuestions } from "../data/questions/googleFullStack";

function InterviewSession() {

  const navigate = useNavigate();

const location = useLocation();

const companyId = location.state?.companyId;

const companyName = location.state?.companyName;

const role = location.state?.role;

  const questions = googleFullStackQuestions;

  const [currentQuestion, setCurrentQuestion] = useState(0);

const [answers,setAnswers]=useState(() => {

    const saved=localStorage.getItem("interviewAnswers");

    return saved ? JSON.parse(saved) : {};

});

  const current = questions[currentQuestion];

  const handleAnswerChange = (value) => {

    setAnswers({
      ...answers,
      [currentQuestion]: value
    });

  };

  const nextQuestion = () => {

    if (currentQuestion < questions.length - 1) {

      setCurrentQuestion(currentQuestion + 1);

    }

  };

  const previousQuestion = () => {

    if (currentQuestion > 0) {

      setCurrentQuestion(currentQuestion - 1);

    }

  };

const submitInterview = () => {

  navigate("/review-answers", {
    state: {
  questions,
  answers,
  companyId,
  companyName,
  role
}
  });

};

useEffect(() => {
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);

useEffect(() => {

    localStorage.setItem(
        "interviewAnswers",
        JSON.stringify(answers)
    );

},[answers]);

  return (
    

    <div className="min-h-screen bg-[#0f172a] text-white p-10">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>

<h1 className="text-4xl font-bold">
  {companyName} Interview
</h1>
            <p className="text-slate-400">

              {role}
            </p>

          </div>

          <Timer

            initialTime={900}

            onTimeUp={submitInterview}

          />

        </div>

        <ProgressBar

          current={currentQuestion}

          total={questions.length}

        />

        <QuestionCard

          question={current}

          answer={answers[currentQuestion] || ""}

          onAnswerChange={handleAnswerChange}

        />

        {/* Buttons */}

        <div className="flex justify-between mt-8">

          <button

            onClick={previousQuestion}

            disabled={currentQuestion === 0}

            className="px-6 py-3 rounded-xl bg-slate-700 disabled:opacity-40"

          >

            Previous

          </button>

          {

            currentQuestion === questions.length - 1 ?

            (

              <button

                onClick={submitInterview}

                className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700"

              >

                Submit Interview

              </button>

            )

            :

            (

              <button

                onClick={nextQuestion}

                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"

              >

                Next

              </button>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default InterviewSession;