import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const menu = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Resume", path: "/resume" },
        { name: "Companies", path: "/companies" },
        { name: "Interview Simulator", path: "/interview" },
        { name: "Career Roadmap", path: "/roadmap" },
        { name: "Practice Arena", path: "/practice" }
    ];

    const handleLogout = () => {
localStorage.removeItem("token");
    localStorage.removeItem("student_id");
    localStorage.removeItem("name");
            navigate("/");
    };

    return (
        <div className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">

            <div>

                <div className="mb-12">
                    <h1 className="text-3xl font-bold">
                        SkillTree
                    </h1>

                    <p className="text-slate-400 mt-2 text-sm">
                        AI Career Ecosystem
                    </p>
                </div>

                <div className="flex flex-col gap-3">

                    {menu.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={
                                location.pathname === item.path
                                    ? "bg-cyan-600 p-4 rounded-2xl border border-cyan-600"
                                    : "bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl border border-slate-700"
                            }
                        >
                            {item.name}
                        </Link>
                    ))}

                </div>

            </div>

            <button
                onClick={handleLogout}
                className="bg-red-500/10 hover:bg-red-500/20 p-4 rounded-2xl border border-red-500/20"
            >
                Logout
            </button>

        </div>
    );
}

export default Sidebar;