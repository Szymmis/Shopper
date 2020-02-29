export class Group {
    constructor(name, color) {
        this.id = Math.random();
        this.name = name;
        this.color = color;
        this.items = [];
    }
}

export class Item {
    constructor(name, price) {
        this.id = Math.random();
        this.name = name;
        this.price = price;
        this.priority = 2;
        let _date = new Date();
        this.date = `0${_date.getUTCDay()}.0${_date.getUTCMonth() + 1}`;
    }

    getGroup() {

    }
}

export class Task {
    constructor(name, time, priority) {
        this.id = Math.random();
        this.name = name;
        this.time = time;
        this.priority = (priority) ? priority : 2;
        this.done = false;
    }
}