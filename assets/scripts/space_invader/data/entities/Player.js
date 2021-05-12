import {Entity} from "./Entity.js";
import {Control} from "../components/index.js";

/*
 * 
 */
export class Player extends Entity {
    control;

    constructor(x, y, width, height, color, velocity) {
        super(x, y, width, height, color, velocity);
        this.control = new Control;
    }

    animate(context) {
        this._draw(context);
        this._update();
        this.handleAction();
    }

    handleAction() {
        if (this.control.isGoingLeft())
            this.augmentVelocity({x: -0.5, y: 0});
        if (this.control.isGoingRight())
            this.augmentVelocity({x: 0.5, y: 0});
    }

    isShooting() {
        if (this.control.isShooting())
            return true;
        return false;
    }
}