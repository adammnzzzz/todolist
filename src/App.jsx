import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
  toggleTheme,
} from "./redux/todo";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();
  const { items, isDarkMode } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return alert("Tuls tgas dulu!");
    dispatch(createTodo(taskName));
    setTaskName("");
  };

  const completed = items.filter((t) => t.completed).length;

  return (
    <div className={`app-wrapper ${isDarkMode ? "" : "light-theme"}`}>
      <header className="header-section">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="btn btn-sm btn-outline-info position-absolute top-0 end-0 m-3"
        >
          {isDarkMode ? (
            <i className="bi bi-sun"></i>
          ) : (
            <i className="bi bi-moon"></i>
          )}
        </button>

        <h1 className="fw-black" style={{ fontSize: "40px" }}>
          <span style={{ color: "var(--blue)" }}>to</span>
          <span style={{ color: "var(--purple)" }}>do</span>
        </h1>

        <form onSubmit={handleAdd} className="input-container">
          <input
            className="input-task"
            placeholder="Tambah tugas baru"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button className="btn btn-primary fw-bold px-4">
            Tambah <i className="bi bi-plus-circle ms-2"></i>
          </button>
        </form>
      </header>

      <main className="container mt-5 pt-5" style={{ maxWidth: "736px" }}>
        <div className="d-flex justify-content-between mb-4 fw-bold">
          <p style={{ color: "var(--blue)" }}>
            Tugas dibuat{" "}
            <span className="badge bg-dark ms-1">{items.length}</span>
          </p>
          <p style={{ color: "var(--purple-light)" }}>
            Selesai{" "}
            <span className="badge bg-dark ms-1">
              {completed} dari {items.length}
            </span>
          </p>
        </div>

        {items.length === 0 ? (
          <div className="empty-state text-center">
            <i className="bi bi-clipboard-x fs-1 mb-3 d-block"></i>
            <p className="fw-bold mb-0">Belum ada tugas untuk saat ini</p>
            <p className="small">
              Silahkan tambah tugas baru pada form di atas.
            </p>
          </div>
        ) : (
          items.map((todo) => (
            <div key={todo.id} className="todo-card shadow-sm">
              <div
                onClick={() => dispatch(toggleTodo(todo))}
                style={{ cursor: "pointer" }}
              >
                {todo.completed ? (
                  <i className="bi bi-check-circle-fill text-success fs-5"></i>
                ) : (
                  <i className="bi bi-circle text-info fs-5"></i>
                )}
              </div>
              <span
                className={`flex-grow-1 ${todo.completed ? "todo-text-done" : ""}`}
              >
                {todo.title}
              </span>
              <button
                className="btn btn-link text-secondary p-0"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;
