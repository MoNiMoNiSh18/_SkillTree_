import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import ATSResume from "../templates/ATSResume";
import InternshipResume from "../templates/InternshipResume";
import FresherResume from "../templates/FresherResume";
import BackButton from "../components/BackButton";

function ResumeBuilder() {
  const resumeRef = useRef();
  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  summary: "",
  skills: "",
  education: "",
  projects: "",
  certifications: "",
  achievements: ""
});

const [template, setTemplate] =
  useState("ats");
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };
  
    const downloadPDF = async () => {

    const input = resumeRef.current;

   const canvas = await html2canvas(input,{
  scale:2,
  useCORS:true
});

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
        (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
    );

    pdf.save("SkillTree_Resume.pdf");
    };

        const downloadWord = () => {};

const renderTemplate = () => {

  switch(template){

    case "ats":
      return <ATSResume data={form} />;

    case "internship":
      return <InternshipResume data={form} />;

    case "fresher":
      return <FresherResume data={form} />;

    default:
      return <ATSResume data={form} />;
  }

};
const calculateATS = () => {

  let score = 0;
  let suggestions = [];

  if(form.name) score += 10;
  else suggestions.push("Add your full name");

  if(form.email) score += 10;
  else suggestions.push("Add email");

  if(form.phone) score += 10;
  else suggestions.push("Add phone number");

  if(form.summary) score += 15;
  else suggestions.push("Add professional summary");

  if(form.skills) score += 20;
  else suggestions.push("Add technical skills");

  if(form.education) score += 15;
  else suggestions.push("Add education details");

  if(form.projects) score += 15;
  else suggestions.push("Add project experience");

  if(form.certifications) score += 5;

  if(form.achievements) score += 5;

  return { score, suggestions };
};
const atsData = calculateATS();
const scoreColor =
  atsData.score >= 80
    ? "bg-green-500"
    : atsData.score >= 60
    ? "bg-yellow-500"
    : "bg-red-500";
return (

<div className="min-h-screen bg-slate-900 text-white">
  <BackButton/>

  <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-4xl font-bold mb-3">
          AI Resume Builder
        </h1>

        <p className="text-slate-400 mb-10 text-lg">
          Generate ATS-friendly resumes using AI formatting.
        </p>

        <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-4 sticky top-24 self-start h-fit bg-slate-800/80 border border-slate-700 rounded-3xl p-8 space-y-5">
         
          <div className="mb-6">

  <label className="block mb-3 font-semibold text-slate-300">
    Choose Template
  </label>

  <div className="grid grid-cols-1 gap-3">

    <div
      onClick={() => setTemplate("ats")}
      className={`cursor-pointer rounded-2xl p-4 border transition-all ${
        template === "ats"
          ? "border-blue-500 bg-blue-500/10"
          : "border-slate-700 hover:border-slate-500"
      }`}
    >
      <h3 className="font-bold text-white">
        ATS Professional
      </h3>

      <p className="text-sm text-slate-400">
        Best for corporate and placement applications.
      </p>
    </div>

    <div
      onClick={() => setTemplate("internship")}
      className={`cursor-pointer rounded-2xl p-4 border transition-all ${
        template === "internship"
          ? "border-blue-500 bg-blue-500/10"
          : "border-slate-700 hover:border-slate-500"
      }`}
    >
      <h3 className="font-bold text-white">
        Internship Starter
      </h3>

      <p className="text-sm text-slate-400">
        Ideal for first and second-year students.
      </p>
    </div>

    <div
      onClick={() => setTemplate("fresher")}
      className={`cursor-pointer rounded-2xl p-4 border transition-all ${
        template === "fresher"
          ? "border-blue-500 bg-blue-500/10"
          : "border-slate-700 hover:border-slate-500"
      }`}
    >
      <h3 className="font-bold text-white">
        Fresher Plus
      </h3>

      <p className="text-sm text-slate-400">
        Placement-focused modern resume.
      </p>
    </div>

  </div>

</div>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />
       
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />
       
            <input
              type="text"
              name="github"
              placeholder="GitHub URL"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />

            <textarea
              name="summary"
              rows="4"
              placeholder="Professional Summary"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />
       
            <textarea
              name="education"
              rows="4"
              placeholder="Education"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />

            <textarea
              name="skills"
              rows="4"
              placeholder="Skills (comma separated)"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />
       
            <textarea
              name="projects"
              rows="6"
              placeholder="Projects (one per line)"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />
            <textarea
              name="certifications"
              rows="4"
              placeholder="Certifications (one per line)"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />
            <textarea
              name="achievements"
              rows="4"
              placeholder="Achievements (one per line)"
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
            />            
            
          </div>
          <div className="lg:col-span-8 space-y-5 min-w-0">


  <div className="bg-slate-800 rounded-2xl p-6">

    <div className="flex justify-between items-center mb-3">

      <h3 className="font-semibold text-lg">
        ATS Score
      </h3>

      <span className="font-bold text-xl">
        {atsData.score}/100
      </span>

    </div>

    <div className="w-full bg-slate-700 rounded-full h-3">

      <div
        className={`${scoreColor} h-3 rounded-full transition-all duration-500`}
        style={{ width: `${atsData.score}%` }}
      />

    </div>

    <div className="mt-4">

      <h4 className="font-semibold mb-2">
        Suggestions
      </h4>

      {atsData.suggestions.length === 0 ? (

        <p className="text-green-400">
          Excellent! Your resume looks complete.
        </p>

      ) : (

        <ul className="list-disc ml-5 text-slate-300 space-y-1">

          {atsData.suggestions.map((item, index) => (

            <li key={index}>{item}</li>

          ))}

        </ul>

      )}

    </div>

  </div>


  <div className="flex justify-between items-center">

    <h2 className="text-2xl font-bold">
      Resume Preview
    </h2>

    <span className="px-4 py-2 rounded-full bg-slate-700 text-sm">

      {template === "ats"
        ? "ATS Professional"
        : template === "internship"
        ? "Internship Starter"
        : "Fresher Plus"}

    </span>

  </div>
<div className="flex justify-center">
  <div
    ref={resumeRef}
    className="bg-white rounded-3xl shadow-lg overflow-hidden p-10"
  >
    {renderTemplate()}
  </div>
</div>
  <div className="flex gap-4">

    <button
      onClick={downloadPDF}
      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
    >
      Download PDF
    </button>

    <button
      onClick={downloadWord}
      className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold"
    >
      Download Word
    </button>

  </div>

</div>
</div>
      </div>
</div>
  );
}

export default ResumeBuilder;