import { useState, useEffect } from "react";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editingTask, setEditingTask] = useState(null); // Stores the task being edited

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (title.trim() === "") return;
        setTasks([...tasks, { id: Date.now(), title, isCompleted: false }]);
        setTitle("");
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const startEditing = (task) => {
        setEditingTask(task);
        setTitle(task.title);
    };

    const saveEdit = () => {
        setTasks(tasks.map(task =>
            task.id === editingTask.id ? { ...task, title } : task
        ));
        setEditingTask(null);
        setTitle("");
    };

    return (
        <div className="container">
            <h1>📝 To-Do List</h1>

            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Add a new task..." 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                {editingTask ? (
                    <button onClick={saveEdit}>💾 Save</button>
                ) : (
                    <button onClick={addTask}>➕ Add Task</button>
                )}
            </div>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={task.isCompleted ? "completed" : ""}>
                        <input 
                            type="checkbox" 
                            checked={task.isCompleted} 
                            onChange={() => toggleTask(task.id)}
                        />
                        {task.title}
                        <button onClick={() => startEditing(task)}>✏️ Edit</button>
                        <button onClick={() => deleteTask(task.id)}>❌</button>
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .container { text-align: center; margin: 20px; }
                .input-container { margin: 20px 0; display: flex; justify-content: center; }
                input { padding: 10px; margin-right: 10px; width: 250px; }
                button { padding: 10px 15px; cursor: pointer; margin-left: 5px; }
                ul { list-style: none; padding: 0; }
                li { display: flex; align-items: center; justify-content: space-between; width: 400px; margin: 10px auto; padding: 10px; background: #f4f4f4; border-radius: 5px; }
                .completed { text-decoration: line-through; opacity: 0.6; }
            `}</style>
        </div>
    );
}
