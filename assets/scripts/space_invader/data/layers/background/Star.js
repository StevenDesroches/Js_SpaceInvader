/*
 * 
 */
export class Star {
    width;
    height
    centerWidth;
    centerHeight;
    x;
    y;
    z;
    color;
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.centerWidth = width / 2;
        this.centerHeight = height / 2;
        this._create();
    }

    animate(context) {
        this._draw(context);
        this._update();
    }

    _create() {
        let brightness = Math.random() * 255;
        this.x = Math.random() * this.width;
        this.y = Math.random() * this.height;
        this.z = this.width;
        this.color = "rgb(" + brightness + "," + brightness + "," + brightness + ")";
    }

    _draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 3, 3);
    }

    _update() {
        this.x = ((this.x - this.centerWidth) * (this.width / this.z)) + this.centerWidth;
        this.y = ((this.y - this.centerHeight) * (this.width / this.z)) + this.centerHeight;

        this.z -= 0.125;
        if (this.z <= 0)
            this.z = this.width;
        if (this.x < 0 || this.x >= this.width || this.y < 0 || this.y >= this.height)
            this._create();
    }
}