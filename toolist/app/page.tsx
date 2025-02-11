"use client";
import { useEffect, useState } from "react";
import { useTodoStore } from "../lib/store";

export default function Home() {
    const { tasks, fetchTasks, addTask, toggleTask, deleteTask } = useTodoStore();
    const [newTask, setNewTask] = useState("");

    // ✅ Fetch tasks on mount
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // ✅ Add a new task
    const handleAddTask = async () => {
        if (!newTask.trim()) return;
        await addTask(newTask);
        setNewTask("");
    };

    // ✅ Delete a task
    const handleDeleteTask = async (id: string) => { 
      if (!id) {
          console.error("🚨 Error: Task ID is undefined.");
          return;
      }
  
      console.log("🗑️ Attempting to delete task with ID:", id);
      await deleteTask(id);
  };
  
  
    return (
        <div className="todo-container">
            <h1 className="title">📝 To-Do List</h1>

            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    placeholder="Add a new task..."
                    onChange={(e) => setNewTask(e.target.value)}
                    className="input"
                />
                <button onClick={handleAddTask} className="add-button">➕ Add</button>
            </div>

            <ul className="task-list">
                {tasks.length === 0 ? (
                    <p>⚠️ No tasks found.</p>
                ) : (
                    tasks.map((task) =>
                        task && task.id ? ( // ✅ Ensure task exists
                            <li key={task.id} className="task-item">
                                <input
                                    type="checkbox"
                                    checked={task.is_completed}
                                    onChange={() => toggleTask(task.id, !task.is_completed)}
                                />
                                <span className={task.is_completed ? "strikethrough" : ""}>{task.title}</span>
                                <button onClick={() => handleDeleteTask(task.id)} className="delete-button">❌ Delete</button>
                            </li>
                        ) : null
                    )
                )}
            </ul>

            <style jsx>{`
                .todo-container { background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; width: 400px; text-align: center; }
                .input-container { display: flex; justify-content: space-between; margin-bottom: 20px; }
                .input { flex: 1; padding: 10px; border: 2px solid #3498db; border-radius: 5px; font-size: 16px; }
                .add-button { padding: 10px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; }
                .add-button:hover { background: #2980b9; }
                .task-list { list-style: none; padding: 0; }
                .task-item { display: flex; align-items: center; justify-content: space-between; padding: 10px; background: #ecf0f1; border-radius: 5px; margin-bottom: 10px; }
                .strikethrough { text-decoration: line-through; opacity: 0.6; } /* ✅ Strikethrough for completed tasks */
                .delete-button { background: red; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer; }
                .delete-button:hover { background: darkred; }
            `}</style>
        </div>
    );
}
