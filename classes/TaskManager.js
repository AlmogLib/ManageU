export default class TaskManager {
    constructor() {
        this.taskArr = [];
    }
    addTask(desc) {
        this.taskArr.push(desc);
    }
    deleteTask(id) {
        this.taskArr = this.taskArr.filter((task) => task.id != id)
    }
    updateTaskDescription(id, desc) {
        let taskToUpdate = this.taskArr.find((task) => task.id == id);
        let indexToUpdate = this.taskArr.indexOf(taskToUpdate);
        this.taskArr[indexToUpdate].description = desc;
    }
    completeTask(id) {
        let taskToComplete = this.taskArr.find((task) => task.id == id);
        let indexToComplete = this.taskArr.indexOf(taskToComplete);
        this.taskArr[indexToComplete].completed = true;
    }
}