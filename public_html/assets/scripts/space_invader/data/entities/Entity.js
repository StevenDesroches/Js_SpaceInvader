import {BoundingBox} from "../components/index.js";
/**
 * 
 * @type type
 */
export class Entity {
    //_context;
    _color;
    _boundingBox
    _velocity;
    isMoving;

    constructor(x, y, width, height, color, velocity) {
        this._color = color;
        this._velocity = velocity;
        this._boundingBox = new BoundingBox(x, y, width, height);
    }

    animate(context) {
        this._draw(context);
        this._update();
    }

    _draw(context) {
        context.fillStyle = this._color;
        context.fillRect(this._boundingBox.getX(), this._boundingBox.getY(), this._boundingBox.getWidth(), this._boundingBox.getHeight());
    }

    _update() {
//        console.log(this._velocity);
//        if (this._countDecimals(this._velocity.x) > 4) {
//            this._boundingBox.setX(0);
//            this.isMoving = false;
//            return;
//        }
        if (this._velocity.x)
            this._boundingBox.addX(this._velocity.x);
        if (this._velocity.y)
            this._boundingBox.addY(this._velocity.y);

        this.isMoving = true;
        if (this._velocity.x <= 0 && this._velocity.y <= 0)
            this.isMoving = false;

        //console.log(this.isMoving);
    }

    _countDecimals(value) {
        if (Math.floor(value) === value)
            return 0;
        return value.toString().split(".")[1].length || 0;
    }

    getBoundingBox() {
        return this._boundingBox;
    }

    setVelocity(velocity) {
        this._velocity = velocity;
    }

    augmentVelocity(velocity) {
        if (velocity.x) {
            this._velocity.x += velocity.x;
        }
        if (velocity.y) {
            this._velocity.y += velocity.y;
        }
    }

    reduceVelocity(velocity) {
        if (velocity.x) {
            this._velocity.x *= velocity.x;
        }
        if (velocity.y) {
            this._velocity.y *= velocity.y;
        }
    }

}