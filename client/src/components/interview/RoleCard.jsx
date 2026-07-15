function RoleCard({ role, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-4 transition ${
        selected
          ? "bg-blue-600 border-blue-500"
          : "bg-slate-800 border-slate-700 hover:border-blue-500"
      }`}
    >
      <p className="text-center font-medium text-white">
        {role}
      </p>
    </div>
  );
}

export default RoleCard;