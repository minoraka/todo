import { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  function addTodo() {
    if (!input.trim()) {
      alert("Бро, напиши задачу");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input,
      done: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearDone() {
    setTodos(todos.filter((todo) => !todo.done));
  }

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.done;
    if (currentFilter === "done") return todo.done;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.done).length;
  const doneCount = todos.filter((todo) => todo.done).length;

  return (
    <div className="app">
      <h1>Todo</h1>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Новая задача..."
        />
        <button onClick={addTodo}>Добавить</button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={todo.done ? "done" : ""}
            onClick={() => toggleTodo(todo.id)}
          >
            <span>{todo.text}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="filters">
        <div>
          <button
            className={currentFilter === "all" ? "active" : ""}
            onClick={() => setCurrentFilter("all")}
          >
            Все:
          </button>
          <button
            className={currentFilter === "active" ? "active" : ""}
            onClick={() => setCurrentFilter("active")}
          >
            Активные
          </button>
          <button
            className={currentFilter === "done" ? "active" : ""}
            onClick={() => setCurrentFilter("done")}
          >
            Выполненные
          </button>
        </div>
        <button onClick={clearDone}>Очистить выполненные</button>
      </div>

      <div className="counter">
        Активных задач: {activeCount} | Выполненные: {doneCount} | Все: {todos.length}
      </div>
    </div>
  );
}

export default App;