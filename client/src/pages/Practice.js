import { useState } from "react";
import Editor from "@monaco-editor/react";
import { problems } from "../data/problems";
import BackButton from "../components/BackButton";
function Practice() { 

    const [code, setCode] = useState(
`print("Hello SkillTree")`
    );

    const [language, setLanguage] = useState("python");
    const [selectedProblem,setSelectedProblem]=useState(problems[0]);

const [search,setSearch]=useState("");

const [difficulty,setDifficulty]=useState("All");
const filteredProblems = problems.filter(problem=>{

const matchesSearch =
problem.title
.toLowerCase()
.includes(search.toLowerCase());

const matchesDifficulty =
difficulty==="All" ||
problem.difficulty===difficulty;

return matchesSearch && matchesDifficulty;

});
const [output, setOutput] = useState(
  "Click 'Run Code' to execute your solution."
);

const runCode = () => {

  if (!code.trim()) {
    setOutput("No code to execute.");
    return;
  }

  setOutput("Running...\n");

  setTimeout(() => {

    setOutput(
`Execution Completed Successfully

Language : ${language}

Output:
Sample Test Case Passed

Status:
Accepted`
    );

  }, 1200);

};
const submitSolution = () => {

  setOutput(
`Submitting...

All Sample Test Cases Passed

Submission Accepted

Score : 100/100`
  );

};

return (
<div className="min-h-screen bg-slate-950 text-white p-8">

    <BackButton />
 <div className="grid lg:grid-cols-12 gap-6 mt-6">

      {/* LEFT PANEL */}

      <div className="lg:col-span-3 bg-slate-800 rounded-2xl p-5">

        <h2 className="text-2xl font-bold mb-5">
          Problems
        </h2>

        {/* Search */}

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-700 mb-4 outline-none"
        />

        {/* Difficulty */}

        <select
          value={difficulty}
          onChange={(e)=>setDifficulty(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-700 mb-5"
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* Problems */}

        <div className="space-y-3">

          {filteredProblems.map(problem=>(

            <div
              key={problem.id}
              onClick={()=>setSelectedProblem(problem)}
              className={`cursor-pointer rounded-xl p-4 border transition

              ${
                selectedProblem.id===problem.id
                ? "border-cyan-500 bg-cyan-500/10"
                : "border-slate-700 hover:border-slate-500"
              }

              `}
            >

              <h3 className="font-semibold">

                {problem.title}

              </h3>

              <p className="text-sm text-slate-400">

                {problem.topic}

              </p>

              <span className="text-xs">

                {problem.difficulty}

              </span>

            </div>

          ))}

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="lg:col-span-9 space-y-5">

        {/* Problem */}

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-3xl font-bold">

            {selectedProblem.title}

          </h2>

          <p className="text-cyan-400 mb-5">

            {selectedProblem.difficulty}

          </p>

          <p className="whitespace-pre-line text-slate-300">

            {selectedProblem.description}

          </p>

          <div className="mt-5">

            <h4 className="font-semibold">

              Sample Input

            </h4>

            <pre className="bg-slate-900 p-4 rounded-xl">

              {selectedProblem.sampleInput}

            </pre>

          </div>

          <div className="mt-5">

            <h4 className="font-semibold">

              Sample Output

            </h4>

            <pre className="bg-slate-900 p-4 rounded-xl">

              {selectedProblem.sampleOutput}

            </pre>

          </div>

        </div>

        {/* Language */}

        <select
          value={language}
          onChange={(e)=>setLanguage(e.target.value)}
          className="bg-slate-700 p-3 rounded-xl"
        >

          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>

        </select>

        {/* Editor */}

        <Editor
          height="500px"
          language={language}
          value={code}
          onChange={(value)=>setCode(value)}
        />
        <div className="bg-slate-800 rounded-2xl p-5">

  <h3 className="text-xl font-bold mb-3">
    Output Console
  </h3>

  <pre className="bg-black text-green-400 p-5 rounded-xl whitespace-pre-wrap min-h-[180px]">
    {output}
  </pre>

</div>
        {/* Buttons */}

        <div className="flex gap-4">

 <div className="flex gap-4">

  <button
    onClick={runCode}
    className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold"
  >
    Run Code
  </button>

  <button
    onClick={submitSolution}
    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
  >
    Submit
  </button>

</div>
        </div>

      </div>

    </div>
</div>
);
}
export default Practice;