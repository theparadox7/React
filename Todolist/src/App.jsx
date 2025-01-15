import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase-client";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch Todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todolist").select("*");
    if (error) {
      console.error("Error fetching todos: ", error);
      alert("Failed to fetch todos. Please try again.");
    } else {
      setTodoList(data);
    }
  };

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      iscompleted: false,
    };
    const { data, error } = await supabase
      .from("todolist")
      .insert([newTodoData])
      .single();

    if (error) {
      console.error("Error adding todo: ", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  const completeTask = async (id, iscompleted) => {
    const { error } = await supabase
      .from("todolist")
      .update({ iscompleted: !iscompleted })
      .eq("id", id);

    if (error) {
      console.error("Error toggling task: ", error);
    } else {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, iscompleted: !iscompleted } : todo
        )
      );
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("todolist").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task: ", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="New Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo Item</button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <p>{todo.name}</p>
            <button onClick={() => completeTask(todo.id, todo.iscompleted)}>
              {todo.iscompleted ? "Undo" : "Complete Task"}
            </button>
            <button onClick={() => deleteTask(todo.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;