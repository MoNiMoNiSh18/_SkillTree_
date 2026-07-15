function QuestionCard({

  question,

  answer,

  onAnswerChange

}) {

  return (

    <div className="bg-slate-800 rounded-3xl p-8">

      <span className="text-blue-400 font-semibold">

        {question.round}

      </span>

      <h2 className="text-2xl font-bold text-white mt-3 mb-6">

        {question.question}

      </h2>

      <textarea

        rows="8"

        value={answer}

        onChange={(e) => onAnswerChange(e.target.value)}

        placeholder="Type your answer here..."

        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-5 text-white outline-none resize-none"

      />

    </div>

  );

}

export default QuestionCard;