import React from "react";

const TodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-card shadow-sm">
      <div
        onClick={() => onToggle(todo)}
        style={{ cursor: "pointer" }}
        data-testid="toggle-btn"
      >
        {todo.completed ? (
          <i className="bi bi-check-circle-fill text-success fs-5"></i>
        ) : (
          <i className="bi bi-circle text-info fs-5"></i>
        )}
      </div>

      <span className={`flex-grow-1 ${todo.completed ? "todo-text-done" : ""}`}>
        {todo.title}
      </span>

      <button
        className="btn btn-link text-secondary p-0"
        onClick={() => onDelete(todo.id)}
        data-testid="delete-btn"
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
});

export default TodoItem;
