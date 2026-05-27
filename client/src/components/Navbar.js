import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("student_id");

    navigate("/");
  };

  return (

    <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl mb-6 shadow-lg">

      <Link
        to="/dashboard"
        className="text-2xl font-bold text-cyan-400"
      >
        🌳 SkillTree
      </Link>

      <div className="flex gap-4">

        <Link
          to="/dashboard"
          className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl font-semibold"
        >
          Dashboard
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;