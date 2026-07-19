import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!email.trim()) {
    toast.error("Please enter your email.");
    return;
}
    try {

      await API.post("/password/forgot", { email });

      navigate("/reset-password", {
        state: { email }
      });

    } catch (err) {

      alert("Email not found.");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

      <div className="
bg-slate-800
border
border-slate-700
rounded-3xl
shadow-xl
hover:shadow-cyan-500/10
transition-all
duration-300
p-10
w-full
max-w-md
">
      <h1 className="text-4xl font-bold text-center">
    SkillTree
</h1>

<p className="text-slate-400 text-center mt-2">
    Placement Preparation Platform
</p>

<p className="text-sm text-slate-500 text-center mb-8">
    Build Skills • Practice • Get Placed
</p>
        <h1 className="text-3xl font-bold mb-3">
          Forgot Password
        </h1>

        <p className="text-slate-400 mb-6">
          Enter your registered email address.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
w-full
p-4
rounded-xl
bg-slate-700
border
border-slate-600
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
outline-none
transition
mb-4
"
        />

        <button
          onClick={handleContinue}
          className="
w-full
bg-cyan-500
hover:bg-cyan-600
active:scale-[0.98]
transition-all
duration-200
p-4
rounded-xl
font-semibold
disabled:opacity-50
"
        >
          Continue
        </button>

      </div>

    </div>

  );

}

export default ForgotPassword;