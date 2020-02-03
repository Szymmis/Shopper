import Item from './Item'

export default class Group {
    constructor(name, color, header) {
        this.name = name;
        this.color = color;
        this.header = header;
        this.items = [new Item("Kiełbasa Krakowska", this, Math.floor(Math.random() * 100)), new Item("Kiełbasa Krakowska", this, Math.floor(Math.random() * 100))];
    }
}