function ProgressBar({ current, total }) {

  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="mb-8">

      <div className="flex justify-between text-sm text-slate-300 mb-2">

        <span>
          Question {current + 1} of {total}
        </span>

        <span>
          {Math.round(percentage)}%
        </span>

      </div>

      <div className="w-full bg-slate-700 rounded-full h-3">

        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />

      </div>

    </div>
  );

}

export default ProgressBar;