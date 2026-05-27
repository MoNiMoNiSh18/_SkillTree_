import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Tasks() {

    const [tasks, setTasks] = useState([]);

    const [role, setRole] = useState("Full Stack Developer");

    const student_id = localStorage.getItem("student_id");

    const fetchTasks = async () => {

        const res = await API.get(
            `/tasks/${role}?student_id=${student_id}`
        );

        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, [role]);

    const completeTask = async (task_id) => {

        await API.post("/tasks/complete", {
            student_id,
            task_id
        });

        fetchTasks();
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
  <Navbar />
        <div style={{ padding: "20px" }}>

            <h2>Daily Skill Tasks</h2>

            <select onChange={(e) => setRole(e.target.value)}>

                <option>Full Stack Developer</option>

                <option>AI Engineer</option>

                <option>Blockchain Developer</option>

            </select>

            <br /><br />

            {tasks.map(task => (

                <div
                    key={task.id}
                    style={{
                        border: "1px solid gray",
                        marginBottom: "10px",
                        padding: "10px"
                    }}
                >

                    <h4>
                        Day {task.day_number}
                    </h4>

                    <p>{task.task_title}</p>

                    {task.completed ? (

                        <button disabled>
                            ✅ Completed
                        </button>

                    ) : (

                        <button
                            onClick={() => completeTask(task.id)}
                        >
                            Mark Complete
                        </button>

                    )}

                </div>

            ))}

        </div>
        </div>
    );
}

export default Tasks;