function CompanyCard({ company, selected, onClick }) {

  const Icon = company.icon;

  return (

    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:scale-105 ${
        selected
          ? "border-blue-500 bg-blue-500/10"
          : "border-slate-700 bg-slate-800 hover:border-blue-400"
      }`}
    >

      <div className="flex justify-center mb-4">

        <Icon
          className={`text-5xl ${company.color}`}
        />

      </div>

      <h3 className="text-center text-xl font-semibold">

        {company.name}

      </h3>

      <p className="text-center text-slate-400 mt-2">

        {company.difficulty} Interview

      </p>

    </div>

  );

}

export default CompanyCard;