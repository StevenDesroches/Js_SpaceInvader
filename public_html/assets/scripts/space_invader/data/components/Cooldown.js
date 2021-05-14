/**
 * 
 * @type type
 */
export class Cooldown {
    _array;
    millis;
    constructor(millis = 500) {
        this._array = [];
        this.millis = millis;
    }

    isReady(key) {
        if (this._array[key] <= Date.now() || !this._array[key]) {
            this._applyCooldown(key);
            return true;
        }
        return false;
    }

    _applyCooldown(key) {
        this._array[key] = Date.now() + this.millis;
    }

}