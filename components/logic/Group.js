import Item from './Item'

export default class Group {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.items = [new Item("Przedmiot #1", this, Math.floor(Math.random() * 100)), new Item("Przedmiot #2", this, Math.floor(Math.random() * 100))];
    }
}