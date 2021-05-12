import {Entity} from "./Entity.js";

export class Projectile extends Entity {

    constructor(x, y, width, height, color, velocity) {
        super(x, y, width, height, color, velocity);
    }

}