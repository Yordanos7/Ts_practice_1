"use strict";
let todos = [];
let taskId = 1;
function addTodo(todo) {
  console.log(`Todo added ${todo.task}`);
  todos.push({
    id: taskId++,
    task: todo.task,
    completed: todo.completed,
  });
}
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
}
function toggleTodo(id) {
  todos.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    } else {
      todo;
    }
  });
}
function getTodos() {
  return todos;
}
function handleSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("todo-input");
  const task = input.value.trim();
  if (task) {
    const newTodo = {
      id: taskId++, // Generate a unique ID
      task: task,
      completed: false, // Default to not completed
    };
    addTodo(newTodo);
    input.value = "";
    getTodos();
  }
}
function renderTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <span class="todo-id">#${todo.id}</span>
          <span class="todo-task">${todo.task}</span>
          <button onclick="toggleTodo(${todo.id})" class="toggle-btn" >
            ${todo.completed ? "Undo" : "Complete"}
          </button>
          <button onclick="removeTodo(${todo.id})">Remove</button>
    `;
    todoList.appendChild(li);
  });
}
// here we are gona get event adds to the form
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = parseInt(e.target.getAttribute("data-id"));
    toggleTodo(id);
    renderTodos();
  });
});
document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = parseInt(e.target.getAttribute("data-id"));
    deleteTodo(id);
    renderTodos();
  });
});
// app.ts - Initialization
function initializeApp() {
  const form = document.getElementById("todo-form");
  form.addEventListener("submit", handleSubmit);
  renderTodos();
}
// Start the app
initializeApp();
