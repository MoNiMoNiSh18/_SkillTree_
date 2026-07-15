import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyCard from "../components/interview/CompanyCard";
import RoleCard from "../components/interview/RoleCard";
import InterviewInfo from "../components/interview/InterviewInfo";

import { companies, roles } from "../data/interviewData";

function InterviewSimulator() {

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

const navigate = useNavigate();

const startInterview = () => {

  navigate("/interview-session", {
    state: {
      companyId: selectedCompany.id,
      companyName: selectedCompany.name,
      role: selectedRole,
    },
  });

};
  return (

    <div className="min-h-screen bg-[#0f172a] text-white p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Interview Simulator
        </h1>

        <p className="text-slate-400 mb-10">
          Practice company-specific interviews and evaluate your placement readiness.
        </p>

        {/* Companies */}

        <h2 className="text-2xl font-semibold mb-5">
          Choose Company
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {companies.map((company) => (

            <CompanyCard

              key={company.id}

              company={company}

              selected={selectedCompany?.id === company.id}

              onClick={() => setSelectedCompany(company)}

            />

          ))}

        </div>

        {/* Roles */}

        <h2 className="text-2xl font-semibold mt-12 mb-5">
          Choose Role
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {roles.map((role) => (

            <RoleCard

              key={role}

              role={role}

              selected={selectedRole === role}

              onClick={() => setSelectedRole(role)}

            />

          ))}

        </div>

        {/* Interview Details */}

        {selectedCompany && selectedRole && (

          <InterviewInfo

            company={selectedCompany}

            role={selectedRole}

            onStart={startInterview}

          />

        )}

      </div>

    </div>

  );

}

export default InterviewSimulator;