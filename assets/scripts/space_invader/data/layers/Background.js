import {Layer} from "./Layer.js";
/*
 * 
 */
export class Background extends Layer {
    constructor(canvas) {
        super(canvas);
//        this.context.fillStyle = "black";
//        this.context.fillRect(0, 0, this.width, this.height);
        this._draw();
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _draw() {
        this.context.clearRect(0, 0, this.width, this.height)
        for (var i = 0; i < 500; i++) {
            let x = Math.random() * this.width;
            let y = Math.random() * this.height;
            let intensity = Math.random() * 255;
            let rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
            this.context.fillStyle = rgb;
            this.context.fillRect(x, y, 1, 1);

        }
    }

    animate() {
        //this._draw();
    }

}