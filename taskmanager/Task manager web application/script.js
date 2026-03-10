console.log("JavaScript loaded");
const inputBox = document.getElementById("taskInput");
const listContainer = document.getElementById("taskList");

function addTask() {
  if (inputBox.value === "") {
    alert("Please enter a task");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = inputBox.value;
  listContainer.appendChild(li);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  inputBox.value = "";

  saveTasks();
  updateCount();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveTasks();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveTasks();
      updateCount();
    }
  },
  false,
);

function saveTasks() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
  listContainer.innerHTML = localStorage.getItem("tasks") || "";
  updateCount();
}

inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function updateCount() {
  let count = listContainer.children.length;
  document.getElementById("task-count").innerText = "Total Tasks: " + count;
}

showTasks();
