import { useState } from "react";
import API from "../services/api";

function Roadmap() {

  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);

  const student_id = localStorage.getItem("student_id");

  const analyze = async () => {

    const res = await API.post(
      `/roadmap/${student_id}`,
      { role }
    );

    setResult(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>SkillTree Roadmap</h2>

      <select onChange={(e) => setRole(e.target.value)}>

        <option>Select Role</option>

        <option>Full Stack Developer</option>

        <option>AI Engineer</option>

        <option>Blockchain Developer</option>

      </select>

      <br /><br />

      <button onClick={analyze}>
        Analyze Skill Gap
      </button>

      {result && (
        <div>

          <h3>{result.role}</h3>

          <h4>You Have:</h4>

          <ul>
            {result.have.map((s, i) => (
              <li key={i}>✅ {s}</li>
            ))}
          </ul>

          <h4>Missing Skills:</h4>

          <ul>
            {result.missing.map((s, i) => (
              <li key={i}>❌ {s}</li>
            ))}
          </ul>

        </div>
      )}

    </div>
  );
}

export default Roadmap;