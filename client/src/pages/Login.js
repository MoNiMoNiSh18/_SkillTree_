import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem(
        "student_id",
        res.data.student_id
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Login failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="bg-slate-800 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-2 text-center">
          🌳 SkillTree
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Grow your skills branch by branch
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-700 mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-700 mb-6 outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition p-4 rounded-xl font-bold"
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