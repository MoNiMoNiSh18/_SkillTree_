import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Companies() {
  const [companies, setCompanies] = useState([]);

  const student_id = localStorage.getItem("student_id");

useEffect(() => {
  if (!student_id) return;

  API.get(`/companies/eligibility/${student_id}`)
    .then(res => setCompanies(res.data))
    .catch(err => console.error(err));
}, [student_id]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
  <Navbar />
    <div style={{ padding: "20px" }}>
      <h2>Eligible Companies</h2>

      {companies.length === 0 ? (
        <p>No companies available</p>
      ) : (
        <ul>
          {companies.map((c) => (
            <li key={c.id}>
              <b>{c.name}</b> — Min CGPA: {c.min_cgpa}-{c.status}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default Companies;