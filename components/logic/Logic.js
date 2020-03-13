export class Group {
    constructor(name, color) {
        this.id = Math.random();
        this.name = name;
        this.color = color;
        this.items = [];
    }
}

export class Task {
    constructor(name, time, priority) {
        this.id = Math.random();
        this.name = '';
        this.time = time;
        this.priority = (priority) ? priority : 2;
        this.done = false;
    }
}