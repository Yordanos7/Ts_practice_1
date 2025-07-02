type todo = {
  id: number;
  task: string;
  completed: boolean;
};

let todos: todo[] = [];
let taskId = 1;

function addTodo(task: string): void {
  const newTodo: todo = {
    id: taskId++,
    task: task,
    completed: false,
  };
  todos.push(newTodo);
}
function toogleTodo(id: number): void {
  todos.map((todo) => {
    if (todo.id == id) {
      todo.completed = !todo.completed;
    } else {
      return todo;
    }
  });
}
function deleteTodo(id: number): void {
  todos.filter((todo) => todo.id !== id);
}

function getTodos(): todo[] {
  return todos;
}

function handleSubmit(e: Event): void {
  e.preventDefault();
  const formid = document.getElementById("todo-form") as HTMLElement;
  const input = document.getElementById("todo-input") as HTMLInputElement;
  const text = input.value.trim();
  if (text) {
    addTodo(text);
    input.value = "";
    renderTodos();
  }
}

function renderTodos(): void {
  const todoList = document.getElementById("todo-list") as HTMLElement;
  todoList.innerHTML = "";
  getTodos().forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.task;
    li.className = todo.completed ? "completed" : "";
    li.addEventListener("click", () => {
      toogleTodo(todo.id);
      renderTodos();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form") as HTMLFormElement;
  form.addEventListener("submit", handleSubmit);
  renderTodos();
});
