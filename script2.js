import Task from "./classes/Task.js";
import TaskManager from "./classes/TaskManager.js";

let manager = new TaskManager();

function showTaskList() {
    document.getElementById("activeList").innerHTML = "";
    document.getElementById("completedList").innerHTML = "";
    for (let task of manager.tasksArr) {
        if (task.completed === false) {
            document.getElementById("activeList").innerHTML +=
                ` <div class="input-group mb-3 w-100 mx-auto">
            <input type="text" class="form-control m-1 w-50" aria-describedby="basic-addon2" disabled placeholder="${task.get("description")}">
            <div class="input-group-append">
                <button class="btn btn-success text-white m-1" type="button" onclick="completeTask(${task.get("id")})"><i class="fa-solid fa-check"></i></button>
            </div>
            <div class="input-group-append">
                <button onclick="updateTaskDescription(${task.get("id")})" class="btn btn-primary text-white m-1" type="button"><i class="fa-solid fa-pen"></i></button>
            </div>
            <div class="input-group-append">
                <button class="btn btn-danger text-white m-1" type="button"><i class="fa-solid fa-trash" onclick="deleteTask(${task.get("id")})"></i></button>
            </div>
        </div>`
        } else {
            document.getElementById("completedList").innerHTML +=
                `<div class="input-group mb-3 w-100 mx-auto">
            <input type="text" class="form-control m-1 w-50" aria-describedby="basic-addon2" placeholder="${task.get("description")}">
            <div class="input-group-append m-1">
                <button class="btn btn-success text-white" type="button" disabled><i
                        class="fa-solid fa-check-double"></i></button>
            </div>
            <div class="input-group-append m-1">
                <button class="btn btn-primary text-white" type="button" disabled ><i
                        class="fa-solid fa-pen"></i></button>
            </div>
            <div class="input-group-append m-1">
                <button class="btn btn-danger text-white" type="button" disabled><i
                        class="fa-solid fa-trash"></i></button>
            </div>
        </div>`
        }
    }
}

window.addNewTask = function addNewTask() {
    let description = document.getElementById("newTaskInput").value;
    if (!description) return
    manager.addTask(new Task(description));
    showTaskList();
    localStorage.setItem("tasks", JSON.stringify(manager.tasksArr));
    document.getElementById("newTaskInput").value = "";
};

window.updateTaskDescription = function updateTaskDescription(id) {
    let newDescription = prompt("Enter a new Task Description", "New Description");
    if (newDescription == "" || newDescription == null) alert("Someting went wrong");
    else {
        manager.updateTaskDescription(id, newDescription);
        localStorage.setItem("tasks", JSON.stringify(manager.tasksArr));
        showTaskList();
    }
}

window.deleteTask = function deleteTask(id) {
    if (confirm("Are you sure?")) {
        manager.deleteTask(id);
        localStorage.setItem("tasks", JSON.stringify(manager.tasksArr));
        showTaskList();
    }
};

window.completeTask = function completeTask(id) {
    manager.completeTask(id);
    localStorage.setItem("tasks", JSON.stringify(manager.tasksArr));
    showTaskList();
}

window.onload = function onLoad() {
    let storage = localStorage.getItem("tasks");
    try {
        storage = JSON.parse(storage);
        for (let item of storage) {
            manager.addTask(new Task(item.description, item.id, item.completed));
        }
        showTaskList();
    } catch {
        localStorage.setItem("tasks", JSON.stringify([]));
    }
}