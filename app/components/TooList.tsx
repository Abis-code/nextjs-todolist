"use client";
import React, { useState, useEffect } from "react";
import { AddTask } from "./AddTask";
import { supabase } from "@/lib/supabase";

const TooList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    fetchTooList();
    const interval = setInterval(fetchTooList, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch Tasks from Supabase
  const fetchTooList = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;

      setTodos(data || []); // ✅ Use data instead of todos
    } catch (error: any) {
      console.error("Error fetching todos:", error.message);
    }
  };

  // ✅ Delete Task
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw error;

      console.log("Task deleted:", id);
      fetchTooList();
    } catch (error: any) {
      console.error("Error deleting task:", error.message);
    }
  };

  // ✅ Toggle Task Completion
  const handleComplete = async (id: number, completed: boolean) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ is_completed: !completed }) // ✅ Ensure correct column name
        .eq("id", id);

      if (error) throw error;

      console.log("Task completion toggled:", id);
      fetchTooList();
    } catch (error: any) {
      console.error("Error toggling task completion:", error.message);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="title">📝 To-Do List</h1>

      <ul className="task-list">
        {todos.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          todos.map((task) => (
            <li key={task.id} className={task.is_completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => handleComplete(task.id, task.is_completed)}
              />
              <span>{task.title}</span>
              <button onClick={() => handleDelete(task.id)} className="delete-button">
                ❌ Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TooList;
