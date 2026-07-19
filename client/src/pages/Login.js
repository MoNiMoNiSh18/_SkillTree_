import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim()) {
    toast.error("Please enter your email address.");
    return;
}

if (!password.trim()) {
    toast.error("Please enter your password.");
    return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
}

if (password.length < 6) {
    toast.error("Password must contain at least 6 characters.");
    return;
}
    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("student_id",res.data.student_id);
      localStorage.setItem("name",res.data.name);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Login failed");
    }
  };
useEffect(() => {

  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }

}, [navigate]);
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

        <input
          type="email"
          placeholder="Enter Email"
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
"      />

        <input
  type="password"
  placeholder="Enter Password"
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
"
/>

<div className="flex justify-end mt-2 mb-6">

  <Link
    to="/forgot-password"
    className="text-sm text-cyan-400 hover:text-cyan-300 transition"
  >
    Forgot Password?
  </Link>

</div>

        <button
          onClick={handleLogin}
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
          Login
        </button>

        <p className="text-center text-slate-400 mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-cyan-400 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;