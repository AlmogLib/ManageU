export default class Task {
    constructor(description, id, completed = false) {
        this.completed = completed;
        this.description = description;
        this.id = id ? id : Math.floor(Math.random() * 1001);
    }
    get(propName) {
        return this[propName];
    }
    set(propName, value) {
        this[propName] = value;
    }
}