import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleContinue = async () => {

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

    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="bg-slate-800 rounded-3xl p-10 w-full max-w-md">

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
          className="w-full p-4 rounded-xl bg-slate-700 mb-6 outline-none"
        />

        <button
          onClick={handleContinue}
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-4 rounded-xl font-semibold"
        >
          Continue
        </button>

      </div>

    </div>

  );

}

export default ForgotPassword;