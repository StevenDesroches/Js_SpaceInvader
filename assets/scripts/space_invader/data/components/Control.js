import {Cooldown} from "./Cooldown.js";

/**
 * 
 * @type type
 */
export class Control {
    _pressedKeys;
    _cooldownKeys;
    constructor() {
        this._pressedKeys = [];
        this._cooldownKeys = new Cooldown();
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
            if (this._cooldownKeys.isReady(32))
                return true;
        return false;
    }

}