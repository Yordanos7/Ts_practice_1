type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

let todos: Todo[] = [];
let taskId = 1;

function addTodo(task: string): void {
  console.log(`Todo added ${task}`);
  todos.push({
    id: taskId++,
    task,
    completed: false,
  });
}

function getTodos(): Todo[] {
  return todos;
}

function handleSubmit(e: Event): void {
  e.preventDefault();
  const input = document.getElementById("todo-input") as HTMLInputElement;
  const task = input.value.trim();
  if (task) {
    addTodo(task);
    input.value = "";
    renderTodos();
  }
}

function deleteTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
}

function toggleTodo(id: number): void {
  // todos.map((todo) => {
  //   if (todo.id === id) {
  //     todo.completed = !todo.completed;
  //   } else {
  //     todo;
  //   }
  // });
  todos = todos.map((todo) =>
    todo.id == id ? { ...todo, completed: !todo.completed } : todo
  );
}

function renderTodos(): void {
  const todoList = document.getElementById("todo-list") as HTMLUListElement;
  todoList.innerHTML = "";

  getTodos().forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
           <span style="text-decoration: ${
             todo.completed ? "line-through" : "none"
           }">
          ${todo.task}
        </span>
        <div>
          <button class="toggle-btn" data-id="${todo.id}">
            ${todo.completed ? "Undo" : "Complete"}
          </button>
          <button class="delete-btn" data-id="${todo.id}">Delete</button>
        </div>
    `;
    todoList.appendChild(li);
  });
}

// here we are gona get event adds to the form
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = parseInt((e.target as HTMLElement).getAttribute("data-id")!);
    toggleTodo(id);
    renderTodos();
  });
});

document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = parseInt((e.target as HTMLElement).getAttribute("data-id")!);
    deleteTodo(id);
    renderTodos();
  });
});

// app.ts - Initialization
function initializeApp(): void {
  const form = document.getElementById("todo-form") as HTMLFormElement;
  form.addEventListener("submit", handleSubmit);
  renderTodos();
}

// Start the app
initializeApp();
