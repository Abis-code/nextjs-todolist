import { create } from "zustand";
import { supabase } from "./supabase";

const useTodoStore = create((set) => ({
    todos: [],
    fetchTodos: async () => {
        const { data, error } = await supabase.from("todos").select("*");
        if (!error) set({ todos: data });
    },
    addTodo: async (title) => {
        const { data, error } = await supabase.from("todos").insert([{ title }]).select();
        if (!error) set((state) => ({ todos: [...state.todos, data[0]] }));
    },
    updateTodo: async (id, is_completed) => {
        const { data, error } = await supabase
            .from("todos")
            .update({ is_completed })
            .match({ id })
            .select();
        if (!error) set((state) => ({
            todos: state.todos.map((todo) => (todo.id === id ? data[0] : todo)),
        }));
    },
    deleteTodo: async (id) => {
        const { error } = await supabase.from("todos").delete().match({ id });
        if (!error) set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }));
    },
}));
const addTask = async (title, dueDate) => {
    const { data, error } = await supabase
        .from("todos")
        .insert([{ title, is_completed: false, due_date: dueDate }])
        .select();
    if (!error) set((state) => ({ todos: [...state.todos, data[0]] }));
};


export default useTodoStore;

