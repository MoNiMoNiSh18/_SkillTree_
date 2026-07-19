import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
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
if (!password.trim()) {
    toast.error("Please enter a new password.");
    return;
}

if (password.length < 6) {
    toast.error("Password should be at least 6 characters.");
    return;
}

if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
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
"       />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
"       />

        <button
          onClick={handleReset}
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
          Update Password
        </button>

      </div>

    </div>

  );

}

export default ResetPassword;