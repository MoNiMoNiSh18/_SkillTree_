function InterviewInfo({ company, role, onStart }) {
  return (
    <div className="bg-slate-800 rounded-3xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Interview Details
      </h2>

      <div className="space-y-3">

        <p><strong>Company:</strong> {company.name}</p>

        <p><strong>Role:</strong> {role}</p>

        <p><strong>Questions:</strong> {company.questions}</p>

        <p><strong>Duration:</strong> {company.duration}</p>

        <p><strong>Difficulty:</strong> {company.difficulty}</p>

        <p><strong>Rounds:</strong></p>

        <ul className="list-disc ml-6 text-slate-300">
          <li>Technical</li>
          <li>Behavioral</li>
          <li>HR</li>
        </ul>

      </div>

      <button
        onClick={onStart}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold"
      >
        Start Interview
      </button>

    </div>
  );
}

export default InterviewInfo;