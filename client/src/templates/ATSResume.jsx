function ATSResume({ data }) {
  return (
    <div className="bg-white text-black p-10 min-h-[1100px]">

      {/* Header */}

      <div className="text-center border-b pb-4 mb-6">

        <h1 className="text-3xl font-bold">
          {data.name || "Your Name"}
        </h1>

        <p className="text-sm mt-2">
          {data.email}
          {data.email && data.phone ? " | " : ""}
          {data.phone}
        </p>

        <p className="text-sm">
          {data.linkedin}
        </p>

        <p className="text-sm">
          {data.github}
        </p>

      </div>

      {/* Summary */}

      <section className="mb-5">

        <h2 className="text-lg font-bold border-b mb-2">
          PROFESSIONAL SUMMARY
        </h2>

        <p>
          {data.summary}
        </p>

      </section>

      {/* Skills */}

      <section className="mb-5">

        <h2 className="text-lg font-bold border-b mb-2">
          TECHNICAL SKILLS
        </h2>

        <div className="flex flex-wrap gap-2">

          {data.skills
            ?.split(",")
            .map((skill, index) => (

              <span
                key={index}
                className="border px-2 py-1 text-sm rounded"
              >
                {skill.trim()}
              </span>

            ))}

        </div>

      </section>

      {/* Education */}

      <section className="mb-5">

        <h2 className="text-lg font-bold border-b mb-2">
          EDUCATION
        </h2>

        <p className="whitespace-pre-line">
          {data.education}
        </p>

      </section>

      {/* Projects */}

      <section className="mb-5">

        <h2 className="text-lg font-bold border-b mb-2">
          PROJECTS
        </h2>

        {data.projects
          ?.split("\n")
          .map((project, index) => (

            <div
              key={index}
              className="mb-3"
            >
              <p className="font-semibold">
                {project}
              </p>
            </div>

          ))}

      </section>

      {/* Certifications */}

      <section className="mb-5">

        <h2 className="text-lg font-bold border-b mb-2">
          CERTIFICATIONS
        </h2>

        <ul className="list-disc ml-5">

          {data.certifications
            ?.split("\n")
            .map((cert, index) => (

              <li key={index}>
                {cert}
              </li>

            ))}

        </ul>

      </section>

      {/* Achievements */}

      <section>

        <h2 className="text-lg font-bold border-b mb-2">
          ACHIEVEMENTS
        </h2>

        <ul className="list-disc ml-5">

          {data.achievements
            ?.split("\n")
            .map((item, index) => (

              <li key={index}>
                {item}
              </li>

            ))}

        </ul>

      </section>

    </div>
  );
}

export default ATSResume;