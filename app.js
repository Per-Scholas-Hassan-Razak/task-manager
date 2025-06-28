let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("task-name");
const categoryInput = document.getElementById("task-category");
const deadlineInput = document.getElementById("task-deadline");
const statusInput = document.getElementById("task-status");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function createTask(name, category, deadline, status = "In Progress") {
  return { id: Date.now(), name, category, deadline, status };
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkOverdue() {
  const today = new Date().toISOString().split("T")[0];
  tasks = tasks.map((t) =>
    t.status !== "Completed" && t.deadline < today
      ? { ...t, status: "Overdue" }
      : t
  );
  saveTasks();
}

function displayTasks(list = tasks) {
  taskList.innerHTML = "";
  list.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.name}</span>
      <select data-id="${task.id}">
        <option ${
          task.status === "In Progress" ? "selected" : ""
        }>In Progress</option>
        <option ${
          task.status === "Completed" ? "selected" : ""
        }>Completed</option>
        <option ${task.status === "Overdue" ? "selected" : ""}>Overdue</option>
      </select>
    `;
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const name = taskInput.value.trim();
  const category = categoryInput.value.trim();
  const deadline = deadlineInput.value;
  if (!name || !category || !deadline) return;
  tasks.push(createTask(name, category, deadline, statusInput.value));
  checkOverdue();
  saveTasks();
  displayTasks();
  taskInput.value = "";
  categoryInput.value = "";
  deadlineInput.value = "";
});

taskList.addEventListener("change", (e) => {
  if (e.target.tagName === "SELECT") {
    const id = +e.target.dataset.id;
    const status = e.target.value;
    tasks = tasks.map((t) => (t.id === id ? { ...t, status } : t));
    checkOverdue();
    saveTasks();
    displayTasks();
  }
});

const filterButtons = document.querySelectorAll("[data-filter]");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    if (filter === "all") return displayTasks();
    const filtered = tasks.filter(
      (t) => t.status.toLowerCase().replace(" ", "-") === filter
    );
    displayTasks(filtered);
  });
});

checkOverdue();
displayTasks();
