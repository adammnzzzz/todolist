import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";


export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${API_URL}?_limit=8`); 
  return response.data;
});

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (title) => {
    const response = await axios.post(API_URL, {
      title,
      completed: false,
      userId: 1,
    });
    return response.data;
  },
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (todo) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, {
    ...todo,
    completed: !todo.completed,
  });
  return response.data;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: { items: [], isDarkMode: true, status: "idle" },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.unshift({ ...action.payload, id: Date.now() }); 
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1)
          state.items[index].completed = action.payload.completed;
      });
  },
});

export const { toggleTheme } = todoSlice.actions;
export default todoSlice.reducer;
