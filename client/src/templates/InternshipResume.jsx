function InternshipResume({ data }) {
  return (
    <div className="bg-white text-black p-10 min-h-[1100px]">

      <div className="text-center mb-8">

        <h1 className="text-4xl font-bold">
          {data.name || "Your Name"}
        </h1>

        <p className="mt-2">
          {data.email} | {data.phone}
        </p>

      </div>

      <section className="mb-6">
        <h2 className="text-blue-700 text-xl font-bold mb-2">
          Career Objective
        </h2>

        <p>
          {data.summary}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-blue-700 text-xl font-bold mb-2">
          Skills
        </h2>

        <ul className="list-disc ml-5">
          {data.skills?.split(",").map((skill, i) => (
            <li key={i}>{skill.trim()}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-blue-700 text-xl font-bold mb-2">
          Projects
        </h2>

        {data.projects?.split("\n").map((project, i) => (
          <p key={i} className="mb-2">
            • {project}
          </p>
        ))}
      </section>

      <section>
        <h2 className="text-blue-700 text-xl font-bold mb-2">
          Education
        </h2>

        <p className="whitespace-pre-line">
          {data.education}
        </p>
      </section>

    </div>
  );
}

export default InternshipResume;