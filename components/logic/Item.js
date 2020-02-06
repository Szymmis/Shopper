export default class Item {
    constructor(name, group, price){
        this.name = name;
        this.group = group;
        this.price = price;
        this.priority = Math.floor(Math.random()*3);
        let _date = new Date();
        this.date = `0${_date.getUTCDay()}.0${_date.getUTCMonth()+1}`;
    }
}