import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

export const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadTasks = async () => {

            try {

                const data = await getTasks();

                setTasks(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadTasks();

    }, []);

    if (loading) {
        return (
            <div className="container py-5">
                <p>Loading tasks...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <h1 className="mb-4">
                Tasks
            </h1>

            <div className="list-group">

                {tasks.map((task) => (

                    <div
                        key={task.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >

                        <span>
                            {task.title}
                        </span>

                        <span
                            className={
                                task.completed
                                    ? "badge bg-success"
                                    : "badge bg-secondary"
                            }
                        >

                            {task.completed
                                ? "Completed"
                                : "Pending"}

                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
};