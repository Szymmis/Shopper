export default class Item {
    constructor(name, group, price){
        this.name = name;
        this.group = group;
        this.price = price;
        this.priority = Math.floor(Math.random()*3);
        this.date = new Date().getDate();
    }
}