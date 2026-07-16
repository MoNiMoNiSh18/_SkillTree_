import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function ResetPassword() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {

    if (!password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      await API.post("/password/reset", {
        email,
        password
      });

      alert("Password updated successfully.");

    navigate("/", { replace: true });
    
    } catch (err) {

      alert("Unable to reset password.");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="bg-slate-800 rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold mb-3">
          Reset Password
        </h1>

        <p className="text-slate-400 mb-6">
          Create a new password for your account.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-700 mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-700 mb-6 outline-none"
        />

        <button
          onClick={handleReset}
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-4 rounded-xl font-semibold"
        >
          Update Password
        </button>

      </div>

    </div>

  );

}

export default ResetPassword;