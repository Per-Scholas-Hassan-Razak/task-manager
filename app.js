let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("task-name");
const categoryInput = document.getElementById("task-category");
const deadlineInput = document.getElementById("task-deadline");
const statusInput = document.getElementById("task-status");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function createTask(name, category, deadline, status = "In Progress") {
  return { id: Date.now(), name, category, deadline, status };
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}