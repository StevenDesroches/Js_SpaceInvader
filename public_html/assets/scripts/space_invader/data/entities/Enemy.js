import {Entity} from "./Entity.js";

export class Enemy extends Entity {

    constructor(x, y, width, height, velocity) {
        super(x, y, width, height, `#${Math.floor(Math.random() * 16777215).toString(16)}`, velocity);
    }

}