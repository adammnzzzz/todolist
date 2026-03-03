import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ items, onToggle, onDelete }) => {
  return items.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onToggle={onToggle}
      onDelete={onDelete}
    />
  ));
};

export default React.memo(TodoList);
