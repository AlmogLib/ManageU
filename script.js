import Task from "./classes/Task.js";
import TaskManager from "./classes/TaskManager.js";

let manager = new TaskManager();

function showTaskInForm() {
    document.getElementById('activeTasks').innerHTML = "";
    document.getElementById('completedTasks').innerHTML = "";
    for (let task of manager.taskArr) {
        if (task.completed === false) {
            document.getElementById('activeTasks').innerHTML +=
                `<div class="input-group mb-3 w-50 mx-auto">
                 <input type="text" class="form-control m-1" placeholder=${task.get("description")} disabled aria-label="Recipient's username"
                aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn bg-success text-white m-1" type="button" onclick="completeTask(${task.get("id")})"><i class="fa-solid fa-check"></i>
                </button>
            </div>
            <div class="input-group-append">
                <button class="btn bg-primary text-white m-1" type="button" onclick="updateTask(${task.get("id")})"><i class="fa-solid fa-pen"></i>
                </button>
            </div>
            <div class="input-group-append">
                <button class="btn bg-danger text-white m-1" type="button" onclick="deleteTask(${task.get("id")})"><i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
            </div>`
        }
        else {
            document.getElementById('completedTasks').innerHTML +=
                `<div class="input-group mb-3 w-50 mx-auto">
                 <input type="text" class="form-control m-1" placeholder=${task.get("description")} disabled aria-label="Recipient's username"
                aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn bg-success text-white m-1" type="button" onclick="completeTask(${task.get("id")})" disabled><i
                        class="fa-solid fa-check-double"></i>
                </button>
            </div>
            <div class="input-group-append">
                <button class="btn bg-primary text-white m-1" type="button" onclick="updateTask(${task.get("id")})" disabled><i class="fa-solid fa-pen"></i>
                </button>
            </div>
            <div class="input-group-append">
                <button class="btn bg-danger text-white m-1" type="button" onclick="deleteTask(${task.get("id")})" disabled><i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
            </div>`
        }
    }
}

window.addNewTask = function addNewTask() {
    let desc = document.getElementById('newTaskInput').value;
    if (!desc) return;
    manager.addTask(new Task(desc));
    showTaskInForm();
    localStorage.setItem("tasks", JSON.stringify(manager.taskArr));
    document.getElementById("newTaskInput").value = "";
}

window.updateTask = function updateTask(id) {
    let newDesc = prompt("Change the description", "");
    if (newDesc == "" || newDesc == null) alert("Sorry, something went worng");
    else {
        manager.updateTaskDescription(id, newDesc);
        localStorage.setItem("tasks", JSON.stringify(manager.taskArr));
        showTaskInForm();
    }
}

window.deleteTask = function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        manager.deleteTask(id);
        localStorage.setItem("tasks", JSON.stringify(manager.taskArr));
        showTaskInForm();
    }
}
window.completeTask = function completeTask(id) {
    manager.completeTask(id);
    localStorage.setItem("tasks", JSON.stringify(manager.taskArr));
    showTaskInForm();
}
window.onload = function onLoad() {
    let storage = localStorage.getItem("tasks");
    try {
        storage = JSON.parse(storage);
        for (let item of storage) {
            manager.addTask(new Task(item.description, item.id, item.completed));
        }
        showTaskInForm();
    } catch {
        localStorage.setItem("tasks", JSON.stringify([]));
    }
}