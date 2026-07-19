import { useState } from "react";
import API from "../services/api";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const sendMessage = async () => {
  try {
    const student_id = localStorage.getItem("student_id");

    const res = await API.post("/ai/chat", {
      message,
      student_id
    });

    setReply(res.data.reply);
  } catch (err) {
    console.error(err);
    alert("Chat failed");
  }
};

 return (

  <div className="mt-10">

    <div className="bg-slate-800 rounded-2xl p-5 mb-6">

      <div className="flex flex-wrap gap-3">

        <div className="bg-slate-700 px-4 py-2 rounded-xl text-sm">
          What companies match my profile?
        </div>

        <div className="bg-slate-700 px-4 py-2 rounded-xl text-sm">
          What should I learn next?
        </div>

        <div className="bg-slate-700 px-4 py-2 rounded-xl text-sm">
          Improve placement readiness
        </div>

        <div className="bg-slate-700 px-4 py-2 rounded-xl text-sm">
          Missing skills for AI Engineer
        </div>

      </div>

    </div>

    <div className="flex gap-4 mb-6">

      <input
        type="text"
        placeholder="Ask about skills, placements and roadmap..."
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 bg-slate-800 text-white p-4 rounded-2xl border border-slate-600 outline-none"
      />

      <button
        onClick={sendMessage}
        className="bg-cyan-500 hover:bg-cyan-600 transition px-6 rounded-2xl font-semibold"
      >
        Send
      </button>

    </div>

    <div className="bg-slate-800 text-white p-5 rounded-2xl border border-slate-700">

      <p className="text-cyan-400 font-semibold mb-2">
        AI Response
      </p>

      <p className="text-slate-200 leading-7">
        {reply}
      </p>

    </div>

  </div>

);
}
export default Chatbot;