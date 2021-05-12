/**
 * 
 * @type type
 */
export class Control {
    _pressedKeys
    _cooldownKeys
    constructor() {
        this._pressedKeys = [];
        this._cooldownKeys = [];
    }

    update(event) {
        event.type == 'keydown' ? this._pressedKeys[event.keyCode] = true : this._pressedKeys[event.keyCode] = false;
    }

    isGoingRight() {
        if (this._pressedKeys[39])//rigth arrow
            return true;
        return false;
    }

    isGoingLeft() {
        if (this._pressedKeys[37])//left arrow
            return true;
        return false;
    }

    isGoingUp() {
        if (this._pressedKeys[38])//up arrow
            return true;
        return false;
    }

    isGoingDown() {
        if (this._pressedKeys[40])//down arrow
            return true;
        return false;
    }

    isShooting() {
        if (this._pressedKeys[32])//spacebar
            if (this._isReady(32))
                return true;
        return false;
    }

    _isReady(key) {
        if (this._cooldownKeys[key] <= Date.now() || !this._cooldownKeys[key]) {
            this._applyCooldown(key, 500);
            return true;
        }
        return false;
    }

    _applyCooldown(key, millis) {
        this._cooldownKeys[key] = Date.now() + millis;
    }

}