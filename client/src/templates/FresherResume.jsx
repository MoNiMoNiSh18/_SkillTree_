function FresherResume({ data }) {
  return (

    <div className="bg-white text-black min-h-[1100px]">

      <div className="bg-slate-800 text-white p-8">

        <h1 className="text-4xl font-bold">
          {data.name || "Your Name"}
        </h1>

        <p>
          {data.email}
        </p>

        <p>
          {data.phone}
        </p>

      </div>

      <div className="grid grid-cols-3">

        <div className="col-span-1 bg-slate-100 p-6">

          <h2 className="font-bold mb-3">
            Skills
          </h2>

          <ul>

            {data.skills?.split(",").map((skill, i) => (

              <li key={i}>
                • {skill.trim()}
              </li>

            ))}

          </ul>

          <h2 className="font-bold mt-6 mb-3">
            Certifications
          </h2>

          <ul>

            {data.certifications?.split("\n").map((item, i) => (

              <li key={i}>
                • {item}
              </li>

            ))}

          </ul>

        </div>

        <div className="col-span-2 p-6">

          <h2 className="font-bold mb-3">
            Professional Summary
          </h2>

          <p>
            {data.summary}
          </p>

          <h2 className="font-bold mt-6 mb-3">
            Education
          </h2>

          <p className="whitespace-pre-line">
            {data.education}
          </p>

          <h2 className="font-bold mt-6 mb-3">
            Projects
          </h2>

          {data.projects?.split("\n").map((project, i) => (

            <p key={i}>
              • {project}
            </p>

          ))}

        </div>

      </div>

    </div>
  );
}

export default FresherResume;