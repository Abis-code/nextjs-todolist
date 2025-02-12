import { create } from "zustand";
import { supabase } from "./supabase";

interface Task {
    id: string;
    title: string;
    is_completed: boolean;
}

interface TodoStore {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    addTask: (title: string) => Promise<void>;
    toggleTask: (id: string, isCompleted: boolean) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
    tasks: [],

    // ✅ Fetch tasks from Supabase
    fetchTasks: async () => {
        const { data, error } = await supabase.from("todos").select("*").order("created_at", { ascending: true });
    
        if (error) {
            console.error("🚨 Supabase Fetch Error:", error.message);
            return;
        }

        console.log("✅ Fetched Tasks:", data);
        set({ tasks: data || [] });
    },
    
    // ✅ Add task to Supabase
    addTask: async (title) => {
        const { data, error } = await supabase
            .from("todos")
            .insert([{ title, is_completed: false }])
            .select();

        if (error) {
            console.error("🚨 Supabase Insert Error:", error.message);
            return;
        }

        console.log("✅ Task Added:", data);
        set((state) => ({ tasks: [...state.tasks, data[0]] }));
    },

    // ✅ Toggle task completion
    toggleTask: async (id, isCompleted) => {
        if (!id) {
            console.error("🚨 Error: Task ID is undefined.");
            return;
        }

        const { data, error } = await supabase
            .from("todos")
            .update({ is_completed: isCompleted }) // ✅ Ensure is_completed updates
            .match({ id })
            .select();

        if (error) {
            console.error("🚨 Supabase Update Error:", error.message);
            return;
        }

        console.log("✅ Task Updated:", data);
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, is_completed: isCompleted } : task
            ),
        }));
    },

    // ✅ Delete task from Supabase
    deleteTask: async (id) => {
        if (!id) {
            console.error("🚨 Error: Task ID is undefined.");
            return;
        }
    
        console.log("🗑️ Attempting to delete task with ID:", id);
    
        const { error } = await supabase
            .from("todos")
            .delete()
            .eq("id", id); // ✅ Use .eq() instead of .match()
    
        if (error) {
            console.error("🚨 Supabase Delete Error:", error.message);
            return;
        }
    
        console.log("✅ Task Deleted Successfully from Supabase:", id);
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id), // ✅ Remove task from state
        }));
    },
    
}));
