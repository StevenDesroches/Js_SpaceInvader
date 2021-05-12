/**
 * Represent the bounding box of an entity which enable us to do collision detection
 * @type Object
 */
export class BoundingBox {
    _x;//top left corner
    _y;
    _x2;//bottom left corner
    _y2;
    _width;
    _height;
    _color;

    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._x2 = x + width;
        this._y2 = y + height;
        this._color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;//random hex color
    }

    /**
     * FOR DEBUG PURPOSES ONLY
     * This function let us display the area of a boundingBox
     * @param {type} context of a canvas
     */
    draw(context) {
        context.fillStyle = this._color;//random hex color
        context.fillRect(this._x, this._y, this._width, this._height);
    }

    isInBox(boundingBox2) {
        if (this._x < boundingBox2.getX() ||
                this._x2 > boundingBox2.getX2() ||
                this._y < boundingBox2.getY() ||
                this._y2 > boundingBox2.getY2()) {
            return true;
        }
        return false;
    }

    isTouchingBox(boundingBox2) {
        if (this._x < boundingBox2.getX() + boundingBox2.getWidth() &&
                this._x + this._width > boundingBox2.getX() &&
                this._y < boundingBox2.getY() + boundingBox2.getHeight() &&
                this._y + this._height > boundingBox2.getY()) {
            return true;
        }
        return false;
    }

    isTouchingCoords(x, y, width, height) {
        if (this._x < x + width &&
                this._x + this._width > x &&
                this._y < y + height &&
                this._y + this._height > y) {
            return true;
        }
        return false;
    }

    getCenter() {
        let centerX = (this._x + this._x2) / 2;
        let centerY = (this._y + this._y2) / 2;
        return {x: centerX, y: centerY};
    }

    getX() {
        return this._x;
    }
    getY() {
        return this._y;
    }
    getX2() {
        return this._x2;
    }
    getY2() {
        return this._y2;
    }
    getWidth() {
        return this._width;
    }
    getHeight() {
        return this._height;
    }
    addX(x) {
        this._x += x;
        this._updateX2();
    }
    addY(y) {
        this._y += y;
        this._updateY2();
    }
    setX(x) {
        this._x = x;
        this._updateX2();
    }
    setY(y) {
        this._y = y;
        this._updateY2();
    }
    _updateX2() {
        this._x2 = this._x + this._width;
    }

    _updateY2() {
        this._y2 = this._y + this._height;
    }
}