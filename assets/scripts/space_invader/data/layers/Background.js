import {Layer} from "./Layer.js";
import {Star} from "./background//Star.js";
/*
 * 
 */
export class Background extends Layer {
    stars;

    constructor(canvas) {
        super(canvas);
        this.stars = [];
        for (var i = 0; i < 500; i++) {
            this.stars.push(new Star(this.width, this.height));
        }
        this._draw();
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        //console.log(this.stars);
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].animate(this.context);
        }
    }

    animate() {
        this._draw();
    }

}