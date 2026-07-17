import { useNavigate } from "react-router-dom";

function BackButton() {

    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/dashboard")}
            className="bg-slate-800 hover:bg-cyan-600 transition px-5 py-3 rounded-xl font-medium"
        >
            ← Dashboard
        </button>
    );
}

export default BackButton;