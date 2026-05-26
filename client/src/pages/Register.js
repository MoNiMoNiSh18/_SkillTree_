import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

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
    try {
      await API.post("/auth/register", form);

      alert("Registration successful");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>SkillTree Register</h2>

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