import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useEffect } from "react";
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [branch, setBranch] = useState("");
const [cgpa, setCgpa] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    cgpa: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
      if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
  }

  if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
  }

  if (!branch.trim()) {
      toast.error("Please enter your branch.");
      return;
  }

  if (!cgpa) {
      toast.error("Please enter your CGPA.");
      return;
  }

  if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
  }

  if (password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
  }

    try {
      await API.post("/auth/register", form);

      alert("Registration successful");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };
useEffect(() => {

  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }

}, [navigate]);
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="branch"
        placeholder="Branch"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="cgpa"
        placeholder="CGPA"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

      <br /><br />

      <Link to="/">
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Register;